import prisma from "../../prisma";

export default async function getApplicantInterests() {
  const applications = await prisma.application.findMany({
    select: {
      job: {
        select: {
          id: true,
          title: true,
          category: true,
        },
      },
    },
  });

  const categoryCount: Record<string, number> = {};
  const jobTitleCount: Record<string, number> = {};

  for (const app of applications) {
    const job = app.job;
    if (!job) continue;

    if (job.category) {
      categoryCount[job.category] = (categoryCount[job.category] || 0) + 1;
    }

    if (job.title) {
      jobTitleCount[job.title] = (jobTitleCount[job.title] || 0) + 1;
    }
  }

  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }));

  const topJobs = Object.entries(jobTitleCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([title, count]) => ({ title, count }));

  return {
    totalApplications: applications.length,
    topCategories,
    topJobs,
  };
}
