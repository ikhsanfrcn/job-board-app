import prisma from "../../prisma";
import { sendReminderEmail } from "../../utils/mailer";
import xenditClient from "../../helpers/xendit";

export const sendSubscriptionRenewalReminders = async () => {
  const now = new Date();
  
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startOfTomorrow = new Date(tomorrow);
  startOfTomorrow.setHours(0, 0, 0, 0);
  const endOfTomorrow = new Date(tomorrow);
  endOfTomorrow.setHours(23, 59, 59, 999);

  const subscribers = await prisma.subscriber.findMany({
    where: {
      status: "ACTIVE",
      endDate: {
        gte: startOfTomorrow,
        lte: endOfTomorrow,
      },
    },
    include: {
      user: true,
    },
  });

  for (const subscriber of subscribers) {
    const user = subscriber.user;
    if (!user?.email) continue;

    try {
      const subscriptionPlan = await prisma.subscription.findFirst({
        where: {
          type: subscriber.type,
        },
      });

      if (!subscriptionPlan) {
        console.warn(`Subscription type '${subscriber.type}' not found for user ${user.id}`);
        continue;
      }

      const { price: amount, type } = subscriptionPlan;

      const now = new Date();
      const endDate = subscriber.endDate!;
      const diffMs = endDate.getTime() - now.getTime();
      const invoiceDuration = Math.floor(diffMs / 1000); 

      const transaction = await prisma.transaction.create({
        data: {
          userId: subscriber.userId,
          type,
          amount,
          status: "PENDING",
          createdAt: now,
          expiredAt: endDate,
        },
      });

      const invoice = await xenditClient.Invoice.createInvoice({
        data: {
          amount,
          invoiceDuration,
          externalId: transaction.id,
          description: `Renewal subscription ${subscriptionPlan.name}`,
          currency: "IDR",
          reminderTime: 1,
        },
      });

      const data = await prisma.transaction.update({
        where: { id: transaction.id },
        data: { invoiceUrl: invoice.invoiceUrl },
      });

      await sendReminderEmail({
        email: user.email,
        subject: "Your Subscription Renewal",
        templateName: "subscriptionRenewal",
        templateData: {
          heading: "Subscription Renewal Reminder",
          name: user.firstName || user.username,
          plan: subscriptionPlan.name,
          date: subscriber.endDate?.toLocaleDateString(),
          paymentUrl: invoice.invoiceUrl
        },
      });

    } catch (error) {
      console.error(`Failed to send reminder for user ${user.id}:`, error);
    }
  }

  return {
    message: "Subscription renewal reminders sent",
    count: subscribers.length,
  };
};
