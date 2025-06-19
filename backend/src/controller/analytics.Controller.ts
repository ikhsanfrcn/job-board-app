import { Request, Response } from "express";
import getUserDemographics from "../services/analytics/getUserDemographics";
import getSalaryTrends from "../services/analytics/getSalaryTrends";
import getApplicantInterests from "../services/analytics/getApplicantInterests";
import getAnalyticsSummary from "../services/analytics/getAnalyticsSummary";

export class AnalyticsController {
  async userDemographics(req: Request, res: Response) {
    try {
      const data = await getUserDemographics();
      res.status(200).send({ message: "User demographics fetched", data });
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async salaryTrends(req: Request, res: Response) {
    try {
      const data = await getSalaryTrends();
      res.status(200).send({ message: "Salary trends fetched", data });
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async applicantInterests(req: Request, res: Response) {
    try {
      const data = await getApplicantInterests();
      res.status(200).send({ message: "Applicant interests fetched", data });
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async summary(req: Request, res: Response) {
    try {
      const data = await getAnalyticsSummary();
      res.status(200).send({ message: "Analytics summary fetched", data });
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
