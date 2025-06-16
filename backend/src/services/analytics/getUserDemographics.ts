import { calculateAgeGroup } from "../../helpers/analyticsHelper";
import prisma from "../../prisma";

export default async function getUserDemographics() {
  const users = await prisma.user.findMany({
    where: { isVerify: true },
    select: {
      gender: true,
      dob: true,
      city: true
    }
  });

  // Gender distribution
  const genderDistribution: Record<string, number> = {
    Male: 0,
    Female: 0,
    PreferNotToSay: 0,
  };

  const ageDistribution: Record<string, number> = {
    under_20: 0,
    "20_29": 0,
    "30_39": 0,
    "40_above": 0,
  };

  const cityCount: Record<string, number> = {};

  for (const user of users) {
    genderDistribution[user.gender || "PreferNotToSay"]++;

    if (user.dob) {
      const ageGroup = calculateAgeGroup(user.dob);
      ageDistribution[ageGroup]++;
    }

    if (user.city) {
      cityCount[user.city] = (cityCount[user.city] || 0) + 1;
    }
  }

  const topLocations = Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([city, count]) => ({ city, count }));

  return {
    totalUsers: users.length,
    genderDistribution,
    ageDistribution,
    topLocations,
  };
}