import getUserDemographics from "./getUserDemographics";
import getSalaryTrends from "./getSalaryTrends";
import getApplicantInterests from "./getApplicantInterests";
import getOtherData from "./getOtherData";

export default async function getAnalyticsSummary() {
  const [userDemographics, salaryTrends, applicantInterests, otherData] =
    await Promise.all([
      getUserDemographics(),
      getSalaryTrends(),
      getApplicantInterests(),
      getOtherData(),
    ]);

  return {
    userDemographics,
    salaryTrends,
    applicantInterests,
    otherData,
  };
}
