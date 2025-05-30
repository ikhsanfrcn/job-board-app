import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { validateUpdateProfile } from "../middleware/validation";

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
      "/profile",
      validateUpdateProfile,
      this.authMiddleware.verifyToken,
      this.userController.updateUser
    );

    this.router.get("/user-email/:email", this.userController.getUserByEmail);
  }
  getRouter(): Router {
    return this.router;
  }
}
