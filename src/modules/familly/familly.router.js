import { Router } from "express";
import * as famillyController from "./controller/famiily.js";
import auth from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as Validators from "./familly.validation.js";
const router = Router();

router.post(
  "/addOrDeleteAdults",
  auth,
  validation(Validators.addOrDelete),
  famillyController.addOrDeleteAdults
);
router.post(
  "/addOrDeleteBabies",
  auth,
  validation(Validators.addOrDelete),
  famillyController.addOrDeleteBabies
);
router.post(
  "/addOrDeleteChildren",
  auth,
  validation(Validators.addOrDelete),
  famillyController.addOrDeleteChildren
);

export default router;
