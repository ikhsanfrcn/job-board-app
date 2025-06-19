import prisma from "../../prisma";

export const getTransactionById = async (id: string) => {
  return await prisma.transaction.findUnique({
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
