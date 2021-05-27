import { Router } from "express";
import * as taskController from "../controllers/taskController";
import * as authMiddleware from "../express-middleware/authMidleware";
const router = Router();

router.post("/api/task", taskController.createNewTask);
router.get("/api/task/:id", taskController.getTaskById);
router.get("/api/task/user/:userid", taskController.getTasksByUserId);
router.put("/api/task/:id", taskController.updateTask);
router.delete(
  "/api/task/:id",
  authMiddleware.isAuthenticated,
  taskController.deleteTask
);
export default router;
