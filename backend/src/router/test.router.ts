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
        this.router.post("/", this.testController.createTest);
        this.router.get("/:jobId", this.testController.getTest);
    }

    getRouter(): Router{
        return this.router;
    }
}