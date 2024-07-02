import joi from "joi";

export const createUserValidator = joi
  .object({
    userName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    confirmPassword: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .valid(joi.ref("password"))
      .required(),
    role: joi.string().valid("user", "admin").required(),
    phone: joi
      .string()
      .optional()
      .custom((value, helpers) => {
        const arEGRegex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/; // Example regex for Egyptian phone numbers
        if (!arEGRegex.test(value)) {
          return helpers.message(
            "Invalid phone number only accepted Egy  Phone numbers"
          );
        }
        return value;
      }),
  })
  .required();

export const getUserValidator = joi
  .object({
    id: joi
      .string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "Invalid User id format",
        "any.required": "User id is required",
      }),
  })
  .required();

export const updateUserValidator = joi
  .object({
    id: joi
      .string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "Invalid User id format",
        "any.required": "User id is required",
      }),
    userName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    role: joi.string().valid("user", "admin").required(),
    phone: joi
      .string()
      .optional()
      .custom((value, helpers) => {
        const arEGRegex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/; // Example regex for Egyptian phone numbers
        if (!arEGRegex.test(value)) {
          return helpers.message(
            "Invalid phone number only accepted Egy  Phone numbers"
          );
        }
        return value;
      }),
  })
  .required();

export const deleteUserValidator = joi
  .object({
    id: joi
      .string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "Invalid User id format",
        "any.required": "User id is required",
      }),
  })
  .required();

// export const updateLoggedUserValidator = joi
//   .object({
//     userName: joi.string().min(3).max(20).required(),
//     email: joi.string().email().required(),
//     phone: joi
//       .string()
//       .optional()
//       .custom((value, helpers) => {
//         const arEGRegex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/; // Example regex for Egyptian phone numbers
//         if (!arEGRegex.test(value)) {
//           return helpers.message(
//             "Invalid phone number only accepted Egy  Phone numbers"
//           );
//         }
//         return value;
//       }),
//     password: joi
//       .string()
//       .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
//       .required(),
//     confirmPassword: joi
//       .string()
//       .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
//       .valid(joi.ref("password"))
//       .required(),
//     size: joi.number().positive().required(),
//     path: joi.string().required(),
//     filename: joi.string().required(),
//     destination: joi.string().required(),
//     mimetype: joi.string().required(),
//     encoding: joi.string().required(),
//     originalname: joi.string().required(),
//     fieldname: joi.string().required(),
//   })
//   .required();
export const updateLoggedUserValidator = joi
  .object({
    userName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    phone: joi
      .string()
      .optional()
      .custom((value, helpers) => {
        const arEGRegex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/; // Example regex for Egyptian phone numbers
        if (!arEGRegex.test(value)) {
          return helpers.message(
            "Invalid phone number, only Egyptian phone numbers are accepted"
          );
        }
        return value;
      }),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit",
      }),
    confirmPassword: joi
      .string()
      .valid(joi.ref("password"))
      .required()
      .messages({
        "any.only": "Confirm password does not match password",
      }),
    removeProfileImage: joi.boolean().optional(),
    // otional file_related fields
    size: joi.number().positive().optional(),
    path: joi.string().optional(),
    filename: joi.string().optional(),
    destination: joi.string().optional(),
    mimetype: joi.string().optional(),
    encoding: joi.string().optional(),
    originalname: joi.string().optional(),
    fieldname: joi.string().optional(),
  })
  .required();
