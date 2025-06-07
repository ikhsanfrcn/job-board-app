import prisma from "../../prisma";

export const getSubscriptionById = async (id: string) => {
  return await prisma.subscription.findUnique({
    where: { id },
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
