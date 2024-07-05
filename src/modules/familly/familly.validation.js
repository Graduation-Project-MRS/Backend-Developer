import joi from "joi";

export const add = joi
  .object({
    childeren: joi.number().required(),
    adults: joi.number().required(),
  })
  .required();
