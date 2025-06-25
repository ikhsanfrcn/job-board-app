"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouter = void 0;
const express_1 = require("express");
const application_controller_1 = require("../controller/application.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const uploader_1 = require("../helpers/uploader");
class ApplicationRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.applicationController = new application_controller_1.ApplicationController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", (0, uploader_1.uploader)("memoryStorage", "cv-").single("cvUrl"), this.authMiddleware.verifyToken, this.applicationController.createApplication);
        this.router.get("/", this.authMiddleware.verifyToken, this.applicationController.getUserApplications);
        this.router.get("/company/:id", this.authMiddleware.verifyToken, this.applicationController.getCompanyApplications);
        this.router.patch("/:id/status", this.authMiddleware.verifyToken, this.applicationController.updateStatus);
    }
    getRouter() {
        return this.router;
    }
}
exports.ApplicationRouter = ApplicationRouter;
