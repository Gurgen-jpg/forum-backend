"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingController = void 0;
class TestingController {
    constructor(testingService) {
        this.testingService = testingService;
    }
    deleteAll(req, res) {
        this.testingService.deleteAllData();
        res.sendStatus(204);
    }
}
exports.TestingController = TestingController;
