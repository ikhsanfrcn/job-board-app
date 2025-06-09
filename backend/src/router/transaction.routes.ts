import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { TransactionController } from "../controller/transaction.controller";

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.transactionController = new TransactionController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post("/", this.authMiddleware.verifyToken, this.transactionController.createTransaction);
    this.router.post("/webhook", this.transactionController.handleWebhook);
    // this.router.get("/", this.authMiddleware.verifyToken, this.subscriberController.getSubscriberByUser)
    this.router.get("/:id", this.transactionController.getTransactionById);
    this.router.patch("/cancel", this.transactionController.cancelPayment);

  }
  getRouter(): Router {
    return this.router;
  }
}
