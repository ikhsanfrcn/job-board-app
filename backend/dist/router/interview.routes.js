"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const interview_controller_1 = require("../controller/interview.controller");
class InterviewRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.interviewController = new interview_controller_1.InterviewController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", this.interviewController.createInterview);
        this.router.post("/send-reminder", this.interviewController.sendInterviewReminders);
    }
    getRouter() {
        return this.router;
    }
}
exports.InterviewRouter = InterviewRouter;
