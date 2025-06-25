"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const subscription_controller_1 = require("../controller/subscription.controller");
class SubscriptionRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.subscriptionController = new subscription_controller_1.SubscriptionController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", this.authMiddleware.verifyToken, this.authMiddleware.verifyRole, this.subscriptionController.createSubscription);
        this.router.get("/", this.subscriptionController.getSubscription);
        this.router.patch("/:id", this.authMiddleware.verifyToken, this.authMiddleware.verifyRole, this.subscriptionController.updateSubscription);
        this.router.delete("/:id", this.authMiddleware.verifyToken, this.authMiddleware.verifyRole, this.subscriptionController.deleteSubscription);
    }
    getRouter() {
        return this.router;
    }
}
exports.SubscriptionRouter = SubscriptionRouter;
