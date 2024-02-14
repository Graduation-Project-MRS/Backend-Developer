import { Router } from "express";
import * as mealController from "./controller/meals.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import * as validators from "./meals.validation.js";
import auth from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
const router = Router({ mergeParams: true });

router.post(
  "/addAnewRecipe",
  auth,
  fileUpload(filterObject.image).single("image"),
  validation(validators.addAnewRecipe),
  mealController.addAnewRecipe
);

export default router;
