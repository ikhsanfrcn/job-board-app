import prisma from "../../prisma";

export const handleInvoiceStatusUpdate = async (status: string, externalId: string) => {
  if (status === 'PAID') {
    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    await prisma.subscription.update({
      where: { id: externalId },
      data: {
        status: 'PAID',
        startDate: now,
        endDate: endDate,
      },
    });
  } else if (status === 'EXPIRED') {
    await prisma.subscription.update({
      where: { id: externalId },
      data: { status: 'EXPIRED' },
    });
  }
};