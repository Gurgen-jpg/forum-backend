import { Router } from "express";
import { TestingController } from "./testingController";
import { TestingService } from "./testingService";
import { DB } from "../db/db";

export const testingRouter = Router();

const database = DB.getInstance()
const testingService = new TestingService(database)
const testingController = new TestingController(testingService)

testingRouter.delete("/all-data", testingController.deleteAll.bind(testingController));