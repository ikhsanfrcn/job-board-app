"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRouter = void 0;
const express_1 = require("express");
const test_controller_1 = require("../controller/test.controller");
class TestRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.testController = new test_controller_1.TestController();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.get("/", this.testController.getAllTest);
        this.router.post("/", this.testController.createTest);
        this.router.get("/:jobId", this.testController.getTest);
        this.router.post("/user-test", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.testController.submitUserTest(req, res);
            }
            catch (err) {
                next(err);
            }
        }));
        this.router.patch("/:jobId/activate", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.testController.activateTest(req, res);
            }
            catch (err) {
                next(err);
            }
        }));
        this.router.patch("/:jobId/deactivate", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.testController.deactivateTest(req, res);
            }
            catch (err) {
                next(err);
            }
        }));
    }
    getRouter() {
        return this.router;
    }
}
exports.TestRouter = TestRouter;
