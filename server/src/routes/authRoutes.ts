import expres from "express";
import * as authController from "../controllers/authController";
const router = expres.Router();

router.post("/login", authController.loginController);
router.post("/register", authController.registerController);
router.post("/logout", authController.logoutController);
router.get("/me", authController.me);

export default router;
