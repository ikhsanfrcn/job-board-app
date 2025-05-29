import { Router } from "express";
import { ApplicationController } from "../controller/application.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { uploader } from "../helpers/uploader";

export class ApplicationRouter {
  private router: Router;
  private applicationController: ApplicationController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.applicationController = new ApplicationController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post("/", uploader("memoryStorage", "cv-").single("cvUrl"), this.authMiddleware.verifyToken, this.applicationController.createApplication)
    this.router.get("/", this.authMiddleware.verifyToken, this.applicationController.getUserApplications)
  }

  getRouter(): Router {
    return this.router
  }
}
