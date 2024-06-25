import Joi from 'joi';

export const validate = (schema) => {
  return (req, res, next) => {
    const copyReq = {
      ...req.body,
      ...req.params,
      ...req.query,
      ...req.files,
    };

    const { error } = schema.validate(copyReq, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((error) => error.message);
      return res.status(400).json({ message: errorMessages });
    }

    next();
  };
};
