"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingService = void 0;
class TestingService {
    constructor(database) {
        this.database = database;
    }
    deleteAllData() {
        this.database.delteAllData();
    }
}
exports.TestingService = TestingService;
