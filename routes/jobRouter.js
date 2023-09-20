import { Router } from "express";
const router = Router();

import {
  getAllJob,
  getSingleJob,
  deletJob,
  updateJobs,
  createJob,
  showStatus,
} from "../controllers/jobController.js";
import {
  validateInParam,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllJob)
  .post(checkForTestUser, validateJobInput, createJob);
router.route("/stats").get(showStatus);
router
  .route("/:id")
  .get(validateInParam, getSingleJob)
  .patch(checkForTestUser, validateJobInput, validateInParam, updateJobs)
  .delete(checkForTestUser, validateInParam, deletJob);
export default router;
