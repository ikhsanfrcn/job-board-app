import { Router } from "express";
import { JobController } from "../controller/job.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class JobRouter {
  private router: Router;
  private jobController: JobController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.jobController = new JobController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post("/", this.authMiddleware.verifyToken, this.jobController.create);
    this.router.get("/", this.jobController.getJobs);
    this.router.get("/admin", this.authMiddleware.verifyToken, this.jobController.getCompanyJobs);
    this.router.get("/:id", this.jobController.getById);
    this.router.patch("/:id/publish", this.authMiddleware.verifyToken, this.jobController.togglePublish);
    this.router.put("/:id", this.authMiddleware.verifyToken, this.jobController.togglePublish);
    this.router.delete("/:id", this.authMiddleware.verifyToken, this.jobController.delete)
  }
  getRouter(): Router {
    return this.router;
  }
}
