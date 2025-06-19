"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const company_controller_1 = require("../controller/company.controller");
const uploader_1 = require("../helpers/uploader");
class CompanyRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.companyController = new company_controller_1.CompanyController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/register", this.companyController.register);
        this.router.patch("/verify", this.authMiddleware.verifyToken, this.companyController.verify);
        this.router.post("/login", this.companyController.login);
        this.router.post("/request-reset", this.companyController.requestPasswordReset);
        this.router.patch("/password-reset", this.authMiddleware.verifyToken, this.companyController.passwordReset);
        this.router.get("/profile", this.authMiddleware.verifyToken, this.companyController.profile);
        this.router.patch("/profile", this.authMiddleware.verifyToken, this.companyController.updateProfile);
        this.router.get("/", this.companyController.getAllCompanies);
        this.router.patch("/update-logo", (0, uploader_1.uploader)("memoryStorage", "logo-").single("image"), this.authMiddleware.verifyToken, this.companyController.updateLogo);
        this.router.get("/:id/jobs", this.companyController.getCompanyJobs);
        this.router.get("/:id", this.companyController.getCompanyDetail);
    }
    getRouter() {
        return this.router;
    }
}
exports.CompanyRouter = CompanyRouter;
