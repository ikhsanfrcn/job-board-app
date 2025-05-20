import { Router } from "express";
import { IndustryController } from "../controller/industry.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class IndustryRouter {
  private router: Router;
  private industryController: IndustryController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.industryController = new IndustryController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      "/create",
      this.authMiddleware.verifyToken,
      this.industryController.createIndustry
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
