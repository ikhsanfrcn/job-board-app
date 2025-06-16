import { Router } from "express";
import { AnalyticsController } from "../controller/analytics.Controller";

export class AnalyticsRouter {
  private router: Router;
  private analyticsController: AnalyticsController;

  constructor() {
    this.router = Router();
    this.analyticsController = new AnalyticsController();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.get("/user-demographics", this.analyticsController.userDemographics);
    this.router.get("/salary-trends", this.analyticsController.salaryTrends);
    this.router.get("/applicant-interests", this.analyticsController.applicantInterests);
    this.router.get("/summary", this.analyticsController.summary);
  }

  getRouter(): Router {
    return this.router;
  }
}
