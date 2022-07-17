import { api } from "@airtasker/spot";
import "./createEmployee";
import "./deleteEmployee";
import "./editEmployee";
import "./getEmployees";

@api({
    name: "Employees API Documentation",
    version: "1.0.0",
})
class Api {}
