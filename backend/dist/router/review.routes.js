"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRouter = void 0;
const express_1 = require("express");
const review_controller_1 = require("../controller/review.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_1 = require("../middleware/validation");
class ReviewRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.reviewController = new review_controller_1.ReviewController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.get("/company/:id", this.reviewController.getCompanyReviews);
        this.router.post("/:id", validation_1.validateCreateReview, this.authMiddleware.verifyToken, this.reviewController.createReview);
    }
    getRouter() {
        return this.router;
    }
}
exports.ReviewRouter = ReviewRouter;
