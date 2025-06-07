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
    const sub = await txn.subscription.create({
      data: { userId, type, status: 'PENDING', createdAt: now, expiredAt },
    });

    const invoice = await xenditClient.Invoice.createInvoice({
      data: {
        amount,
        invoiceDuration: 3600,
        externalId: sub.id,
        description: `Subscription ${type}`,
        currency: 'IDR',
        reminderTime: 1,
      },
    });

    await txn.subscription.update({
      where: { id: sub.id },
      data: { invoiceUrl: invoice.invoiceUrl },
    });

    return { data: sub, invoiceUrl: invoice.invoiceUrl };
  });
};
