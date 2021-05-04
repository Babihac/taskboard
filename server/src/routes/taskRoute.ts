import { Router } from "express";
import * as taskController from "../controllers/taskController";
const router = Router();

router.post("/api/task", taskController.createNewTask);
router.get("/api/task/:id", taskController.getTaskById);
router.get("/api/task/user/:userid", taskController.getTasksByUserId);
export default router;
