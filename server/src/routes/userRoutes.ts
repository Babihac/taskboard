import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.put("/api/password", userController.updateUserPasswordController);
router.put("/api/user/:id", userController.updateUserController);
router.put("/test/:id", userController.updateUserPasswordController);

export default router;
