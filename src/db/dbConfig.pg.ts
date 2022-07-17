import { Pool } from "pg";
import dbInterface, { QueryParams } from "./dbInterface";

require("dotenv").config();

export default class PostgreSQL_DB implements dbInterface {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            max: 10,
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            idleTimeoutMillis: 30000,
        });
    }

    public async connect() {
        try {
            await this.pool.connect();
        } catch (err) {
            throw err;
        }
    }

    public async query(query: string, params: QueryParams[] = []) {
        try {
            const client = await this.pool.connect();

            const { rows: result } = await this.pool.query(query, params);

            client.release();

            return result;
        } catch (err) {
            throw err;
        }
    }
}
