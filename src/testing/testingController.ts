import { Request, Response } from "express";
import { ITestingService } from "./types";

export class TestingController {
    testingService: ITestingService;

    constructor(testingService: ITestingService) {
        this.testingService = testingService
    }
    deleteAll(req: Request, res: Response) {
        this.testingService.deleteAllData();
        res.sendStatus(204);
    }
}