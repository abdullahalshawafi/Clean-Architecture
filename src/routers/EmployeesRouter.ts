import { Router } from "express";
import { employeesController } from "../controllers";

const router = Router();

router.get("/", employeesController.getAll);
router.get("/:employeeId", employeesController.getById);
router.post("/", employeesController.create);
router.put("/:employeeId", employeesController.update);
router.delete("/:employeeId", employeesController.delete);

export default router;
