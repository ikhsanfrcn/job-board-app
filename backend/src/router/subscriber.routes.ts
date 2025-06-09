import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { SubscriberController } from "../controller/subscriber.controller";

export class SubscriberRouter {
  private router: Router;
  private subscriberController: SubscriberController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.subscriberController = new SubscriberController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post("/", this.authMiddleware.verifyToken, this.subscriberController.createSubscriber);
    this.router.get("/", this.authMiddleware.verifyToken, this.subscriberController.getSubscriberByUser)
    this.router.get("/:id", this.subscriberController.getSubscriberById);
    this.router.patch("/cancel", this.subscriberController.cancelPayment);

  }
  getRouter(): Router {
    return this.router;
  }
}
