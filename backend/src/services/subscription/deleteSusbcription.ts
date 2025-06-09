import { ensureSubscriptionExists } from "../../helpers/subscriptionHelper";
import prisma from "../../prisma";

export const deleteSubscription = async (id: string) => {
  const subscription = await ensureSubscriptionExists(id);
  if (!subscription) {
    throw { status: 400, message: "You are not authorized to delete this job" };
  }
  const deletedJob = await prisma.subscription.delete({ where: { id } });
  return { message: "Subscription deleted", deletedJob };
};
