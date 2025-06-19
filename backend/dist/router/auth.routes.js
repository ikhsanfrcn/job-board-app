"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.AuthController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/register", this.authController.register);
        this.router.patch("/verify", this.authMiddleware.verifyToken, this.authController.verify);
        this.router.post("/login", this.authController.login);
        this.router.post("/google", this.authController.googleAuth);
        this.router.post("/request-reset", this.authController.requestPasswordReset);
        this.router.patch("/password-reset", this.authMiddleware.verifyToken, this.authController.passwordReset);
    }
    getRouter() {
        return this.router;
    }
}
exports.AuthRouter = AuthRouter;
