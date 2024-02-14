import mealsModel from "../../../../DB/model/meals.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { nanoid } from "nanoid";
import { asyncHandler } from "../../../utils/errorHandling.js";
import slugify from "slugify";
export const addAnewRecipe = asyncHandler(async (req, res, next) => {
  const {
    recipeName,
    information,
    typeMeals,
    times,
    EnoughFor,
    calories,
    ingredients,
    steps,
  } = req.body;

  if (!req.file) {
    return next(new Error("meal image is required", { cause: 400 }));
  }
  const cloudFolder = nanoid();

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.FOLDER_CLOUDINARY}/meals/${cloudFolder}`,
    }
  );

  const meal = await mealsModel.create({
    recipeName,
    user: req.user._id,
    information,
    typeMeals,
    times,
    EnoughFor,
    calories,
    ingredients: JSON.parse(ingredients),
    steps: JSON.parse(steps),
    cloudFolder,
    createdBy: req.user._id,
    image: { url: secure_url, id: public_id },
    slug: slugify(req.body.recipeName),
  });

  return res.status(201).json({ success: true, data: meal });
});


