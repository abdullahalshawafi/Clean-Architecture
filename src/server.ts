import express from "express";
import DB from "./db/dbConfig";
import EmployeesRouter from "./routers/EmployeesRouter";

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.dbConnect();
        this.routerConfig();
    }

    private config() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private async dbConnect() {
        try {
            await DB.getDB(process.env.DB_TYPE || "pg").connect();
            console.log("Connected to DB");
        } catch (err) {
            throw err;
        }
    }

    private routerConfig() {
        this.app.use("/api/employees", EmployeesRouter);

        this.app.get("/", (req, res) => {
            res.send(`
                <h1>Welcome to Employees API</h1>
                <p>
                    Please use <a href='/api/employees'>/api/employees</a> endpoint
                </p>
            `);
        });
    }
    public start(port: number) {
        return new Promise((resolve, reject) => {
            this.app
                .listen(port, () => {
                    resolve(port);
                })
                .on("error", (err: object) => {
                    reject(err);
                });
        });
    }
}

export default Server;
