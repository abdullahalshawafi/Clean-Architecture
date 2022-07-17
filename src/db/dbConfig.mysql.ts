import mysql, { Pool } from "mysql2";
import dbInterface, { QueryParams } from "./dbInterface";

require("dotenv").config();

export default class MySQL_DB implements dbInterface {
    private pool: Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT || "3306"),
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        });
    }

    public connect() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });
    }

    public async query(query: string, params: QueryParams[] = []) {
        try {
            const modifiedQuery = query.replace(/\$\d/g, "?");
            const [rows] = await this.pool
                .promise()
                .execute(modifiedQuery, params);

            return rows.constructor === Array ? rows : [rows];
        } catch (err) {
            throw err;
        }
    }
}
