import { IDatabase } from "../db/db";

export class TestingService {
    private database: IDatabase;

    constructor(database: IDatabase) {
        this.database = database
    }

    public deleteAllData() {
        this.database.delteAllData()
    }
}