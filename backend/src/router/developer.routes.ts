import { Router } from "express";
import { DeveloperController } from "../controller/developer.controller";

export class DeveloperRouter {
  private router: Router;
  private developerController: DeveloperController;

  constructor() {
    this.router = Router();
    this.developerController = new DeveloperController();
    this.initializeRoute();
  }

  private initializeRoute() {
      this.router.post("/login", this.developerController.loginDeveloper);
      this.router.post("/register", this.developerController.registerDeveloper);
  }

  getRouter(): Router {
    return this.router;
  }
}
