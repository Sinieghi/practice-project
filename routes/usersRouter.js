import { Router } from "express";
import {
  getAplication,
  getCurrentUser,
  updatteUser,
} from "../controllers/usersControllers.js";
import { validateUserUp } from "../middleware/validationMiddleware.js";
import {
  authPermissions,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-status")
  .get([authPermissions("admin")], getAplication);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUserUp,
  updatteUser
);
export default router;
