import prisma from "../../prisma";

export const cancelPayment = async (id: string) => {
  const subs = await prisma.subscription.update({
    where: { id },
    data: { status: "CANCELED" },
  });

  return { message: "Payment canceled", subs };
};
