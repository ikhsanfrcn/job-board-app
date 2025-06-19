"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const subscriber_controller_1 = require("../controller/subscriber.controller");
class SubscriberRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.subscriberController = new subscriber_controller_1.SubscriberController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", this.authMiddleware.verifyToken, this.subscriberController.createSubscriber);
        this.router.get("/", this.authMiddleware.verifyToken, this.subscriberController.getSubscriberByUser);
        this.router.get("/:id", this.subscriberController.getSubscriberById);
        this.router.patch("/cancel", this.subscriberController.cancelPayment);
        this.router.post("/send-reminder", this.subscriberController.sendReminder);
        this.router.post("/check-expire", this.subscriberController.checkExpire);
    }
    getRouter() {
        return this.router;
    }
}
exports.SubscriberRouter = SubscriberRouter;
