import Joi from 'joi';

const tipSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required()
});

export default tipSchema;
