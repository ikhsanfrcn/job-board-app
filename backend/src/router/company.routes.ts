// import { Router } from "express";
// import { AuthMiddleware } from "../middleware/auth.middleware";
// import { CompanyController } from "../controller/company.controller";

// export class CompanyRouter {
//   private router: Router;
//   private companyController: CompanyController;
//   private authMiddleware: AuthMiddleware;

//   constructor() {
//     this.router = Router();
//     this.companyController = new CompanyController();
//     this.authMiddleware = new AuthMiddleware();
//     this.initializeRoute();
//   }

//   private initializeRoute() {
//     this.router.post("/register", this.authMiddleware.verifyToken, this.companyController.registerCompany);
//     // this.router.patch("/verify", this.authMiddleware.verifyToken, this.authController.verify);
//     // this.router.post("/login", this.authController.login);
//   }

//   getRouter(): Router {
//     return this.router;
//   }
// }
