"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRouter = void 0;
const express_1 = require("express");
const job_controller_1 = require("../controller/job.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
class JobRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.jobController = new job_controller_1.JobController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/", this.authMiddleware.verifyToken, this.jobController.create);
        this.router.get("/", this.jobController.getJobs);
        this.router.get("/admin", this.authMiddleware.verifyToken, this.jobController.getCompanyJobs);
        this.router.get("/:id", this.jobController.getById);
        this.router.patch("/:id/publish", this.authMiddleware.verifyToken, this.jobController.togglePublish);
        this.router.patch("/:id", this.authMiddleware.verifyToken, this.jobController.update);
        this.router.delete("/:id", this.authMiddleware.verifyToken, this.jobController.delete);
    }
    getRouter() {
        return this.router;
    }
}
exports.JobRouter = JobRouter;
