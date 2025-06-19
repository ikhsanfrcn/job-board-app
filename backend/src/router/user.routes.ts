import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { validateUpdateProfile } from "../middleware/validation";
import { uploader } from "../helpers/uploader";

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
    this.router.patch(
      "/update-avatar",
      uploader("memoryStorage", "avatar-").single("image"),
      this.authMiddleware.verifyToken,
      this.userController.updateAvatar
    );

    this.router.get(
      "/is-employee/:id",
      this.authMiddleware.verifyToken,
      this.userController.isEmployee
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
