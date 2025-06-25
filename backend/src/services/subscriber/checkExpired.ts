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
  return { count: ids.length };
};
