import prisma from "../../prisma";
import xenditClient from "../../helpers/xendit";

export const createTransaction = async ({
  userId,
  type,
  amount
}: {
  userId: string;
  type: string;
  amount: number;
}) => {

  const now = new Date();
  const expiredAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 jam

  return await prisma.$transaction(async (txn) => {
    const existing = await txn.subscriber.findUnique({ where: { userId } });
    const isActive =
      existing?.status === "ACTIVE" &&
      existing.endDate &&
      existing.endDate > now;

    if (isActive) {
      throw new Error("You still have an active subscriber.");
    }

    const newTransaction = await txn.transaction.create({
      data: {
        userId,
        type,
        amount,
        status: "PENDING",
        createdAt: now,
        expiredAt,
      },
    });

    const invoice = await xenditClient.Invoice.createInvoice({
      data: {
        amount,
        invoiceDuration: 3600,
        externalId: newTransaction.id,
        description: `Subscription ${type}`,
        currency: "IDR",
        reminderTime: 1,
      },
    });

    await txn.transaction.update({
      where: { id: newTransaction.id },
      data: { invoiceUrl: invoice.invoiceUrl },
    });

    await txn.subscriber.update({
      where: { userId },
      data: {
        transactionId: newTransaction.id,
      },
    });

    return { data: newTransaction, invoiceUrl: invoice.invoiceUrl };
  });
};
