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
router.delete(
  "/deleteMeal/:mealId",
  auth,
  validation(validators.mealId),
  mealController.deleteMeal
);
router.get("/", mealController.getallMeal);
router.get(
  "/single/:mealId",
  validation(validators.mealId),
  mealController.getMealId
);
export default router;
