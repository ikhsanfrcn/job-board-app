import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class UserRouter {
  private router: Router;
  private userController: UserController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.get(
      "/profile",
      this.authMiddleware.verifyToken,
      this.userController.getUserProfile
    );

    this.router.patch(
      "/update",
      this.authMiddleware.verifyToken,
      this.userController.updateUser
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
