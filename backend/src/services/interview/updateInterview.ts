import prisma from "../../prisma";

export const updateInterview = async (
  id: string,
  date: string,
  location: string
) => {
  const interview = await prisma.interview.update({
    where: { id },
    data: {
      date,
      location,
    },
  });

  return { message: "Interview updated", interview };
};
