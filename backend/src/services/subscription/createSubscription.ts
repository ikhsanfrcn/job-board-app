import prisma from "../../prisma";
import { CreateSubscriptionParams } from "../../types/type";

export const createSubscription = async (userId: string, params: CreateSubscriptionParams) => {
  const subscription = await prisma.subscription.create({
    data: { userId, ...params },
  });

  return { message: "Subscription Plan Created", subscription };
};
