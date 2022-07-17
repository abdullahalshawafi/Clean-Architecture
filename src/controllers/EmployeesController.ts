import { Request, Response } from "express";
import dbInterface from "../db/dbInterface";

class EmployeesController {
    private db;

    constructor(db: dbInterface) {
        this.db = db;
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const sql = "SELECT * FROM employee;";

            const employees = await this.db.query(sql);

            res.status(200).send(employees);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public getById = async (req: Request, res: Response) => {
        try {
            const { employeeId } = req.params;

            const sql = "SELECT * FROM employee where id=$1;";

            const employees = await this.db.query(sql, [employeeId]);

            if (employees.length === 0) {
                return res.status(404).send("Employee not found");
            }

            res.send(employees);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public create = async (req: Request, res: Response) => {
        try {
            const { name, salary } = req.body;

            if (!name || !salary) {
                return res.status(400).send("Missing parameters");
            }

            const sql = "INSERT INTO employee (name, salary) VALUES ($1, $2);";

            await this.db.query(sql, [name, salary]);

            res.status(201).send("Created employee successfully");
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const { employeeId } = req.params;
            const { name, salary } = req.body;

            if (!name || !salary) {
                return res.status(400).send("Missing parameters");
            }

            const sql1 = "SELECT * FROM employee where id=$1;";

            const employees = await this.db.query(sql1, [employeeId]);

            if (employees.length === 0) {
                return res.status(404).send("Employee not found");
            }

            const sql2 = "UPDATE employee SET name=$1, salary=$2 WHERE id=$3;";

            await this.db.query(sql2, [name, salary, employeeId]);

            res.send("Updated employee successfully");
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            const { employeeId } = req.params;

            const sql1 = "SELECT * FROM employee where id=$1;";

            const employees = await this.db.query(sql1, [employeeId]);

            if (employees.length === 0) {
                return res.status(404).send("Employee not found");
            }

            const sql2 = "DELETE FROM employee WHERE id=$1;";

            await this.db.query(sql2, [employeeId]);

            res.send("Deleted employee successfully");
        } catch (err) {
            res.status(500).send(err);
        }
    };
}

export default EmployeesController;
