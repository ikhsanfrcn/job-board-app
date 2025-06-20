import prisma from "../../prisma";

export const cancelPayment = async (id: string) => {
  const tnx = await prisma.transaction.update({
    where: { id },
    data: { status: "CANCELED" },
  });

  await prisma.subscriber.updateMany({
    where: { transactionId: tnx.externalId},
    data: { status: "CANCELED" },
  });
  return { message: "Payment canceled", tnx };
};
