import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { SubscriptionController } from "../controller/subscription.controller";

export class SubscriptionRouter {
  private router: Router;
  private subscriptionController: SubscriptionController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.subscriptionController = new SubscriptionController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post("/", this.authMiddleware.verifyToken, this.authMiddleware.verifyRole, this.subscriptionController.createSubscription);
    this.router.get("/", this.subscriptionController.getSubscription)
    this.router.patch("/:id", this.authMiddleware.verifyToken, this.authMiddleware.verifyRole, this.subscriptionController.updateSubscription)
    this.router.delete("/:id", this.authMiddleware.verifyToken, this.authMiddleware.verifyRole, this.subscriptionController.deleteSubscription)
  }

  getRouter(): Router {
    return this.router;
  }
}
