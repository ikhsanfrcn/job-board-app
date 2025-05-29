import { Router } from "express";
import { ReviewController } from "../controller/review.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { validateCreateReview } from "../middleware/validation";

export class ReviewRouter {
  private router: Router;
  private reviewController: ReviewController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.reviewController = new ReviewController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      "/:id",
      validateCreateReview,
      this.authMiddleware.verifyToken,
      this.reviewController.createReview
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
