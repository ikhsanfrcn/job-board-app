import prisma from "../../prisma";

export const checkAndExpireSubscribers = async () => {
  const now = new Date();

  const expiredSubscribers = await prisma.subscriber.findMany({
    where: {
      status: "ACTIVE",
      endDate: {
        lt: now, 
      },
    },
  });

  if (expiredSubscribers.length === 0) {
    console.log("[EXPIRE CHECK] There are no expired subscriptions.");
    return { count: 0 };
  }

  const ids = expiredSubscribers.map((s) => s.id);

  await prisma.subscriber.updateMany({
    where: {
      id: { in: ids },
    },
    data: {
      status: "EXPIRED",
    },
  });

  console.log(`[EXPIRE CHECK] ${ids.length} Subscription status changed to EXPIRED.`);
  return { count: ids.length };
};
