import { Router } from "express";
import { login, logout, register } from "../controllers/userController.js";
import {
  validateLoginErrors,
  validateRegisterErrors,
} from "../middleware/validationMiddleware.js";
const router = Router();

router.route("/register").post(validateRegisterErrors, register);
router.route("/login").post(validateLoginErrors, login);
router.get("/logout", logout);
export default router;
