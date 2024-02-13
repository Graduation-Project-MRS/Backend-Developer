const Joi = require('joi');

exports.validateTip = (req, res, next) => {
    const tipSchema = Joi.object({
        order_id: Joi.string().required(),
        user_id: Joi.string().required(),
        amount: Joi.number().positive().required(),
        title: Joi.string().required(),
        description: Joi.string().required()
    });

    const { error } = tipSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};
