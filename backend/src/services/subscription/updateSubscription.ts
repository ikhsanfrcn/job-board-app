import { ensureSubscriptionExists } from "../../helpers/subscriptionHelper";
import prisma from "../../prisma";

export const updateSubscription = async (
  id: string,
  data: any
) => {
  const subscription = await ensureSubscriptionExists(id);
  if (!subscription) {
    throw { status: 400, message: "Subscription not exist" };
  }

  const updated = await prisma.subscription.update({
    where: { id },
    data,
  });

  return {
    message: "Job updated successfully",
    data: updated,
  };
};
