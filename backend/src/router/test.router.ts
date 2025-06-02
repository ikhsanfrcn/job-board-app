import { Router } from "express";
import { TestController } from "../controller/test.controller";

export class TestRouter{
    private router: Router;
    private testController: TestController;

    constructor(){
        this.router = Router();
        this.testController = new TestController();
        this.initializeRoute();
    }

    private initializeRoute(){
        this.router.get("/", this.testController.getAllTest);
        this.router.post("/", this.testController.createTest);
        this.router.get("/:jobId", this.testController.getTest);
        this.router.post("/user-test", async (req, res, next) => {
            try {
                await this.testController.submitUserTest(req, res);
            } catch (err) {
                next(err);
            }
        });
        this.router.patch("/:jobId/activate", async (req, res, next) => {
            try {
                await this.testController.activateTest(req, res);
            } catch (err) {
                next(err);
            }
        });
        this.router.patch("/:jobId/deactivate", async (req, res, next) => {
            try {
                await this.testController.deactivateTest(req, res);
            } catch (err) {
                next(err);
            }
        });
    }

    getRouter(): Router{
        return this.router;
    }
}