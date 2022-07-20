import { Request, Response } from "express";
import dbInterface from "../db/dbInterface";

class EmployeesController {
    private db;

    constructor(db: dbInterface) {
        this.db = db;
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const pageSize = 10;

            let page = parseInt(req.query.page?.toString() || "1");
            page = page !== NaN && page > 0 ? page : 1;

            const offset = (page - 1) * pageSize;

            const sql1 = `SELECT COUNT(*) as total FROM employee;`;

            const [{ total }] = await this.db.query(sql1);

            const totalPages = Math.ceil(total / pageSize);

            const sql2 = `SELECT * FROM employee LIMIT $1 OFFSET $2;`;

            const employees: object[] = await this.db.query(sql2, [
                pageSize.toString(),
                offset.toString(),
            ]);

            type paginatedResponse = {
                employees: object[];
                total_pages: number;
                current_page: number;
                first_page: string;
                last_page: string;
                next?: string;
                prev?: string;
            };

            const response: paginatedResponse = {
                total_pages: totalPages,
                current_page: page,
                first_page: `/api/employees?page=1`,
                last_page: `/api/employees?page=${totalPages}`,
                next: `/api/employees?page=${page + 1}`,
                prev: `/api/employees?page=${page - 1}`,
                employees,
            };

            if (page === 1) {
                delete response.prev;
            }

            if (page === totalPages) {
                delete response.next;
            }

            res.status(200).json(response);
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
                return res.status(404).json({ error: "Employee not found" });
            }

            res.json(employees[0]);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public create = async (req: Request, res: Response) => {
        try {
            const { name, salary } = req.body;

            if (!name || !salary) {
                return res.status(400).json({ error: "Missing parameters" });
            }

            const sql = "INSERT INTO employee (name, salary) VALUES ($1, $2);";

            await this.db.query(sql, [name, salary]);

            res.status(201).json({ message: "Created employee successfully" });
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            const { employeeId } = req.params;
            const { name, salary } = req.body;

            if (!name || !salary) {
                return res.status(400).json({ error: "Missing parameters" });
            }

            const sql1 = "SELECT * FROM employee where id=$1;";

            const employees = await this.db.query(sql1, [employeeId]);

            if (employees.length === 0) {
                return res.status(404).json({ error: "Employee not found" });
            }

            const sql2 = "UPDATE employee SET name=$1, salary=$2 WHERE id=$3;";

            await this.db.query(sql2, [name, salary, employeeId]);

            res.json({ message: "Updated employee successfully" });
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
                return res.status(404).json({ error: "Employee not found" });
            }

            const sql2 = "DELETE FROM employee WHERE id=$1;";

            await this.db.query(sql2, [employeeId]);

            res.json({ message: "Deleted employee successfully" });
        } catch (err) {
            res.status(500).send(err);
        }
    };
}

export default EmployeesController;
