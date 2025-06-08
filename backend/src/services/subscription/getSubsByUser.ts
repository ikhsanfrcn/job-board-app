import prisma from "../../prisma";

export const getSubscriptionByUser = async (userId: string) => {
  return await prisma.subscription.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });
};
