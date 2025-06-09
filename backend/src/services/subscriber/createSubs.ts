import prisma from '../../prisma';

export const createSubscriber = async ({
  userId,
  type,
}: {
  userId: string;
  type: string;
}) => {

  const now = new Date();

  return await prisma.$transaction(async (txn) => {
    const existing = await txn.subscriber.findUnique({ where: { userId } });

    if (existing) {
      const now = new Date();
      const isActive = existing.status === 'ACTIVE' && existing.endDate && existing.endDate > now;
      if (isActive) {
        throw new Error('You still have an active subscriber.');
      }

      const updatedSub = await txn.subscriber.update({
        where: { userId },
        data: {
          type,
          status: 'PENDING',
          startDate: null,
          endDate: null,
        },
      });

      return { data: updatedSub };
    }

    const newSub = await txn.subscriber.create({
      data: {
        userId,
        type,
        status: 'PENDING',
        createdAt: now,
      },
    });

    return { data: newSub };
  });
};
