import { Router } from "express";
import * as famillyController from "./controller/famiily.js";
import auth from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as Validators from "./familly.validation.js";
const router = Router();

router.patch(
  "/add",
  auth,
  validation(Validators.add),
  famillyController.add
);


export default router;
