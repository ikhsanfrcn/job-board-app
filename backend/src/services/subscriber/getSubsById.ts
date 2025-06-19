import prisma from "../../prisma";

export const getSubscriberById = async (id: string) => {
  return await prisma.subscriber.findUnique({
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
