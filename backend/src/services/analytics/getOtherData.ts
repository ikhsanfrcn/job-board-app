import prisma from "../../prisma";

export default async function getOtherData() {
  const activeSubscribers = await prisma.subscriber.count({
    where: { status: "ACTIVE" },
  });

  const totalUsers = await prisma.user.count({
  });

  const totalCompanies = await prisma.company.count();

  const totalPublishedJobs = await prisma.job.count({
    where: { isPublished: true },
  });

  return {
    activeSubscribers,
    userRoleDistribution: [
       {
        role: "user",
        count: totalUsers,
      },
      {
        role: "company",
        count: totalCompanies,
      },
    ],
    totalPublishedJobs,
  };
}
