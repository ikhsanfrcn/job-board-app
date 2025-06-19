"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_1 = require("../middleware/validation");
const uploader_1 = require("../helpers/uploader");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.UserController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.get("/profile", this.authMiddleware.verifyToken, this.userController.getUserProfile);
        this.router.patch("/profile", validation_1.validateUpdateProfile, this.authMiddleware.verifyToken, this.userController.updateUser);
        this.router.get("/user-email/:email", this.userController.getUserByEmail);
        this.router.patch("/update-avatar", (0, uploader_1.uploader)("memoryStorage", "avatar-").single("image"), this.authMiddleware.verifyToken, this.userController.updateAvatar);
    }
    getRouter() {
        return this.router;
    }
}
exports.UserRouter = UserRouter;
