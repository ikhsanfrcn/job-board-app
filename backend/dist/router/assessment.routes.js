"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillAssessmentRouter = void 0;
const express_1 = require("express");
const assessment_controller_1 = require("../controller/assessment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const uploader_1 = require("../helpers/uploader");
class SkillAssessmentRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.skillAssessmentController = new assessment_controller_1.SkillAssessmentController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.InitializeRoute();
    }
    InitializeRoute() {
        this.router.get("/", this.skillAssessmentController.getAllAssessment);
        this.router.post("/", (0, uploader_1.uploader)("memoryStorage", "badge-").single("badgeImage"), this.skillAssessmentController.createAssessment);
        this.router.put("/progress", this.authMiddleware.verifyToken, this.skillAssessmentController.saveProgress);
        this.router.post("/submit", this.authMiddleware.verifyToken, this.skillAssessmentController.submitAssessment);
        this.router.get("/user-assessment", this.authMiddleware.verifyToken, this.skillAssessmentController.getUserAssessments);
        this.router.get("/user-badges", this.authMiddleware.verifyToken, this.skillAssessmentController.getUserPassedBadges);
        this.router.get("/generate-pdf/:id", this.authMiddleware.verifyToken, this.skillAssessmentController.generatePdf);
        this.router.get("/verify/:id", this.skillAssessmentController.verifyAssessment);
        this.router.post("/start/:templateId", this.authMiddleware.verifyToken, this.skillAssessmentController.startAssessment);
        this.router.get("/:id", this.skillAssessmentController.getAssessmentById);
        this.router.put("/:id", (0, uploader_1.uploader)("memoryStorage", "badge-").single("badgeImage"), this.skillAssessmentController.editAssessment);
        this.router.delete("/:id", this.skillAssessmentController.deleteAssessment);
        this.router.get("/:templateId", this.authMiddleware.verifyToken, this.skillAssessmentController.getAssessmentByTemplateId);
    }
    getRouter() {
        return this.router;
    }
}
exports.SkillAssessmentRouter = SkillAssessmentRouter;
