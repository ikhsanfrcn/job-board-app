import prisma from "../../prisma";

export default async function getSalaryTrends() {
  const applications = await prisma.application.findMany({
    where: {
      expectedSalary: {
        not: null,
      },
    },
    select: {
      expectedSalary: true,
      job: {
        select: {
          title: true,
          city: true,
          category: true,
        },
      },
    },
  });

  const salaryMap = new Map<string, number[]>();

  for (const app of applications) {
    if (!app.expectedSalary || !app.job) continue;

    const key = `${app.job.title} | ${app.job.city}`;
    const salary = (app.expectedSalary);
    if (isNaN(salary)) continue;

    if (!salaryMap.has(key)) {
      salaryMap.set(key, []);
    }

    salaryMap.get(key)?.push(salary);
  }

  const averageSalaries = Array.from(salaryMap.entries()).map(
    ([key, salaries]) => {
      const [title, city] = key.split(" | ");
      const avg =
        salaries.reduce((sum, s) => sum + s, 0) / salaries.length;

      return {
        jobTitle: title,
        city,
        averageSalary: Math.round(avg),
        sampleCount: salaries.length,
      };
    }
  );

  return averageSalaries.sort((a, b) => b.sampleCount - a.sampleCount).slice(0, 10);
}
