import prisma from "../../prisma";

export const getSubscription = async () => {
  const data = await prisma.subscription.findMany();
  return {
    message: "Subscription plans",
    data,
  };
};
