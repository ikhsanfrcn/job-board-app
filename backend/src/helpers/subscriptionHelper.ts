import prisma from "../prisma";

export const ensureSubscriptionExists = async (id: string) => {
  const subscription = await prisma.subscription.findUnique({ where: { id } });
  if (!subscription) throw { status: 404, message: "Subscription not found" };

  return subscription;
};
