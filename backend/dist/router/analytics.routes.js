"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRouter = void 0;
const express_1 = require("express");
const analytics_Controller_1 = require("../controller/analytics.Controller");
class AnalyticsRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.analyticsController = new analytics_Controller_1.AnalyticsController();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.get("/user-demographics", this.analyticsController.userDemographics);
        this.router.get("/salary-trends", this.analyticsController.salaryTrends);
        this.router.get("/applicant-interests", this.analyticsController.applicantInterests);
        this.router.get("/summary", this.analyticsController.summary);
    }
    getRouter() {
        return this.router;
    }
}
exports.AnalyticsRouter = AnalyticsRouter;
