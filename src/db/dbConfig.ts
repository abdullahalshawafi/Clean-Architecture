import MySQL_DB from "./dbConfig.mysql";
import PostgreSQL_DB from "./dbConfig.pg";
import dbInterface, { DB_TYPE } from "./dbInterface";

export default class DB {
    private static postgresDb: dbInterface;
    private static mysqlDb: dbInterface;

    public static getDB(type: string): dbInterface {
        switch (type.toLowerCase()) {
            case DB_TYPE.MYSQL:
                if (!this.mysqlDb) {
                    this.mysqlDb = new MySQL_DB();
                }
                return this.mysqlDb;
            case DB_TYPE.PG:
                if (!this.postgresDb) {
                    this.postgresDb = new PostgreSQL_DB();
                }
                return this.postgresDb;
            default:
                throw new Error("Unknown DB type");
        }
    }
}
