import prisma from "../../prisma";
import xenditClient from "../../helpers/xendit";

export const createTransaction = async ({
  userId,
  type,
  amount,
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

    const prefix = type.slice(0, 3).toUpperCase();

    const lastTransaction = await txn.transaction.findFirst({
      where: {
        externalId: {
          startsWith: prefix,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let nextNumber = 1;
    if (lastTransaction?.externalId) {
      const match = lastTransaction.externalId.match(/-(\d+)$/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    const externalId = `${prefix}-${String(nextNumber).padStart(9, "0")}`;

    const newTransaction = await txn.transaction.create({
      data: {
        userId,
        type,
        amount,
        externalId,
        status: "PENDING",
        createdAt: now,
        expiredAt,
      },
    });

    const invoice = await xenditClient.Invoice.createInvoice({
      data: {
        amount,
        invoiceDuration: 3600,
        externalId,
        description: `Subscription ${type}`,
        currency: "IDR",
        reminderTime: 1,
      },
    });

    await txn.transaction.update({
      where: { id: newTransaction.id },
      data: {
        invoiceUrl: invoice.invoiceUrl,
      },
    });

    await txn.subscriber.update({
      where: { userId },
      data: {
        transactionId: newTransaction.externalId,
      },
    });

    return { data: newTransaction, invoiceUrl: invoice.invoiceUrl };
  });
};
