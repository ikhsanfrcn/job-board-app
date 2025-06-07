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
    this.router.post("/", this.authMiddleware.verifyToken, this.subscriptionController.createSubscription);
    this.router.post("/webhook", this.subscriptionController.handleWebhook);
    this.router.get("/", this.authMiddleware.verifyToken, this.subscriptionController.getSubscriptionByUser)
    this.router.get("/:id", this.subscriptionController.getSubscriptionById);
  }
  getRouter(): Router {
    return this.router;
  }
}
