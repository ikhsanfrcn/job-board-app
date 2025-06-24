import prisma from "../../prisma";

export type SubscribeStatus = {
  isValid: boolean;
  activeSubscription?: {
    startDate: Date;
    endDate: Date;
    type: string;
  };
};

export const isSubscribeService = async (
  userId: string
): Promise<SubscribeStatus> => {
  if (!userId) throw { status: 400, message: "User id is required" };

  const subscribers = await prisma.subscriber.findMany({
    where: {
      userId,
      status: "ACTIVE",
      startDate: { not: null },
      endDate: { not: null },
    },
  });

  const now = new Date();

  const activeSubscription = subscribers.find((sub) => {
    return (
      sub.startDate && sub.endDate && now >= sub.startDate && now <= sub.endDate
    );
  });

  if (activeSubscription) {
    return {
      isValid: true,
      activeSubscription: {
        startDate: activeSubscription.startDate!,
        endDate: activeSubscription.endDate!,
        type: activeSubscription.type,
      },
    };
  }

  return { isValid: false };
};
