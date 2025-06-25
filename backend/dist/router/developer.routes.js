"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperRouter = void 0;
const express_1 = require("express");
const developer_controller_1 = require("../controller/developer.controller");
class DeveloperRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.developerController = new developer_controller_1.DeveloperController();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post("/login", this.developerController.loginDeveloper);
        this.router.post("/register", this.developerController.registerDeveloper);
    }
    getRouter() {
        return this.router;
    }
}
exports.DeveloperRouter = DeveloperRouter;
