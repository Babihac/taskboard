import { Router } from "express";
import * as projectController from "../controllers/projectController";

const router = Router();
router.get("/api/projects/:userid", projectController.findProjectsController);
router.post("/api/project", projectController.createProjectController);

export default router;
