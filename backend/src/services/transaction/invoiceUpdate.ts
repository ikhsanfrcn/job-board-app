import prisma from "../../prisma";

export const handleInvoiceStatusUpdate = async (
  status: string,
  externalId: string
) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: externalId },
  });

  if (!transaction) {
    throw `Transaction not found for ID: ${externalId}`;
  }

  if (status === "PAID") {
    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    await prisma.transaction.update({
      where: { id: externalId },
      data: {
        status: "PAID",
      },
    });

    await prisma.subscriber.update({
      where: { userId: transaction.userId },
      data: {
        status: "ACTIVE",
        startDate: now,
        endDate,
        transactionId: transaction.id,
      },
    });
  } else if (status === "EXPIRED") {
    await prisma.transaction.update({
      where: { id: externalId },
      data: { status: "EXPIRED" },
    });
  }
};
