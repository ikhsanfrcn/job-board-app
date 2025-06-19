"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryRouter = void 0;
const express_1 = require("express");
const industry_controller_1 = require("../controller/industry.controller");
// import { AuthMiddleware } from "../middleware/auth.middleware";
class IndustryRouter {
    // private authMiddleware: AuthMiddleware;
    constructor() {
        this.router = (0, express_1.Router)();
        this.industryController = new industry_controller_1.IndustryController();
        // this.authMiddleware = new AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/create", this.industryController.createIndustry);
        this.router.get("/", this.industryController.getIndustry);
    }
    getRouter() {
        return this.router;
    }
}
exports.IndustryRouter = IndustryRouter;
