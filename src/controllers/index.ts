import DB from "../db/dbConfig";
import EmployeesController from "./EmployeesController";

const db = DB.getDB(process.env.DB_TYPE || "pg");

const employeesController = new EmployeesController(db);

export default Object.freeze({
    employeesController,
});

export { employeesController };
