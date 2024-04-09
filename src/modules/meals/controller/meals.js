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
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

export const recommendMeal = asyncHandler(async (req, res, next) => {
  const ingredients = req.body.ingredients;

  const url = `https://wanna-meal.onrender.com/recommend?input_ingredients_str=${ingredients}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
      "X-RapidAPI-Key": "your-rapidapi-key",
    },
  };

  try {
    let response = await fetch(url, options);
    response = await response.json();
    for (let res of response.Recommendation) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        res.img_link,
        {
          folder: `${process.env.FOLDER_CLOUDINARY}/recommend`,
        }
      );
      res.img_link = { url: secure_url, id: public_id };
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});
export const getallMeal = asyncHandler(async (req, res, next) => {
  const products = await mealsModel
    .find({ ...req.query })
    .pagination(req.query.page)
    .customSelect(req.query.fields)
    .sort(req.query.sort);
  return res.status(200).json({ success: true, result: products });
});
export const getMealId = asyncHandler(async (req, res, next) => {
  const meals = await mealsModel.findById(req.params.mealId);
  if (!meals) {
    return next(new Error("mealId not found", { cause: 404 }));
  }
  return res.json({ success: true, result: meals });
});
export const deleteMeal = asyncHandler(async (req, res, next) => {
  const meal = await mealsModel.findById(req.params.mealId);
  if (!meal) {
    return next(new Error("mealId not found", { cause: 404 }));
  }

  if (req.user._id.toString() !== meal.user.toString()) {
    return next(new Error("not allawed to delete", { cause: 401 }));
  }

  const result = await cloudinary.uploader.destroy(meal.image.id);
  await cloudinary.api.delete_folder(
    `${process.env.FOLDER_CLOUDINARY}/meals/${meal.cloudFolder}`
  );

  await mealsModel.findByIdAndDelete(req.params.mealId);
  return res
    .status(200)
    .json({ success: true, message: "meal delete successfully!" });
});
