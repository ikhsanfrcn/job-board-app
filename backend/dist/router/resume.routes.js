"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeRouter = void 0;
const express_1 = require("express");
const resume_controller_1 = require("../controller/resume.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
class ResumeRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.resumeController = new resume_controller_1.ResumeController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", this.authMiddleware.verifyToken, this.resumeController.createResume);
        this.router.put("/", this.authMiddleware.verifyToken, this.resumeController.updateResume);
        this.router.get("/user", this.authMiddleware.verifyToken, this.resumeController.getUserResume);
        this.router.get("/generate-pdf", this.authMiddleware.verifyToken, this.resumeController.generatePdf);
    }
    getRouter() {
        return this.router;
    }
}
exports.ResumeRouter = ResumeRouter;
