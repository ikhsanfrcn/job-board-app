import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { CompanyController } from "../controller/company.controller";
import { uploader } from "../helpers/uploader";

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
    this.router.patch(
      "/verify",
      this.authMiddleware.verifyToken,
      this.companyController.verify
    );
    this.router.post("/login", this.companyController.login);
    this.router.post(
      "/request-reset",
      this.companyController.requestPasswordReset
    );
    this.router.patch(
      "/password-reset",
      this.authMiddleware.verifyToken,
      this.companyController.passwordReset
    );
    this.router.get(
      "/profile",
      this.authMiddleware.verifyToken,
      this.companyController.profile
    );
    this.router.patch(
      "/profile",
      this.authMiddleware.verifyToken,
      this.companyController.updateProfile
    );
    this.router.get("/", this.companyController.getAllCompanies);

    this.router.patch(
      "/update-logo",
      uploader("memoryStorage", "logo-").single("image"),
      this.authMiddleware.verifyToken,
      this.companyController.updateLogo
    );

    this.router.get("/:id/jobs", this.companyController.getCompanyJobs);
    this.router.get("/:id", this.companyController.getCompanyDetail);
  }

  getRouter(): Router {
    return this.router;
  }
}
