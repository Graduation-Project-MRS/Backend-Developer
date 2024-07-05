import joi from "joi";

export const contactValidator = joi
  .object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    message: joi.string().min(21).required(),
  })
  .required();
