"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const transaction_controller_1 = require("../controller/transaction.controller");
class TransactionRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.transactionController = new transaction_controller_1.TransactionController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", this.authMiddleware.verifyToken, this.transactionController.createTransaction);
        this.router.post("/webhook", this.transactionController.handleWebhook);
        this.router.get("/:id", this.transactionController.getTransactionById);
        this.router.patch("/cancel", this.transactionController.cancelPayment);
    }
    getRouter() {
        return this.router;
    }
}
exports.TransactionRouter = TransactionRouter;
