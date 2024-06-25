import Joi from 'joi';

const ingredientSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required() // Assuming category ID is sent as a string
});

export default ingredientSchema;
