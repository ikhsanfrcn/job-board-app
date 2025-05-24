import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { CompanyController } from "../controller/company.controller";

export class CompanyRouter {
  private router: Router;
  private companyController: CompanyController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.companyController = new CompanyController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post("/register", this.companyController.register);
    this.router.patch("/verify", this.authMiddleware.verifyToken, this.companyController.verify);
    this.router.post("/login", this.companyController.login);
    this.router.post("/request-reset", this.companyController.requestPasswordReset);
    this.router.patch("/password-reset", this.authMiddleware.verifyToken, this.companyController.passwordReset);
  }

  getRouter(): Router {
    return this.router;
  }
}
