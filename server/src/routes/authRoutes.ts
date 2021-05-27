import expres from "express";
import * as authController from "../controllers/authController";
const router = expres.Router();

router.post("/api/login", authController.loginController);
router.post("/api/register", authController.registerController);
router.post("/api/logout", authController.logoutController);
router.get("/me", authController.me);

export default router;
