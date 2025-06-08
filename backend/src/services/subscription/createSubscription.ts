import prisma from '../../prisma';
import xenditClient from '../../helpers/xendit';

const subscriptionPrices: Record<string, number> = {
  STANDART: 25000,
  PROFESSIONAL: 100000,
};

export const createSubscription = async ({
  userId,
  type,
}: {
  userId: string;
  type: string;
}) => {
  const amount = subscriptionPrices[type.toUpperCase()];
  if (!amount) {
    throw new Error('Invalid subscription type');
  }

  const now = new Date();
  const expiredAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 jam

  return await prisma.$transaction(async (txn) => {
    const existing = await txn.subscription.findUnique({ where: { userId } });

    if (existing) {
      const now = new Date();
      const isActive = existing.status === 'PAID' && existing.endDate && existing.endDate > now;
      if (isActive) {
        throw new Error('You still have an active subscription.');
      }

      const updatedSub = await txn.subscription.update({
        where: { userId },
        data: {
          type,
          status: 'PENDING',
          createdAt: now,
          expiredAt,
          invoiceUrl: null,
          startDate: null,
          endDate: null,
        },
      });

      const invoice = await xenditClient.Invoice.createInvoice({
        data: {
          amount,
          invoiceDuration: 3600,
          externalId: updatedSub.id,
          description: `Subscription ${type}`,
          currency: 'IDR',
          reminderTime: 1,
        },
      });

      await txn.subscription.update({
        where: { id: updatedSub.id },
        data: { invoiceUrl: invoice.invoiceUrl },
      });

      return { data: updatedSub, invoiceUrl: invoice.invoiceUrl };
    }

    const newSub = await txn.subscription.create({
      data: {
        userId,
        type,
        status: 'PENDING',
        createdAt: now,
        expiredAt,
      },
    });

    const invoice = await xenditClient.Invoice.createInvoice({
      data: {
        amount,
        invoiceDuration: 3600,
        externalId: newSub.id,
        description: `Subscription ${type}`,
        currency: 'IDR',
        reminderTime: 1,
      },
    });

    await txn.subscription.update({
      where: { id: newSub.id },
      data: { invoiceUrl: invoice.invoiceUrl },
    });

    return { data: newSub, invoiceUrl: invoice.invoiceUrl };
  });
};
