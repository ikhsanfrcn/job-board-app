import prisma from "../../prisma";

export const getSubscriberByUser = async (userId: string) => {
  return await prisma.subscriber.findUnique({
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
