// Validation joi
const Joi = require("@hapi/joi");

// Create user validation
const registerValidation = (data) => {
  const joiValSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return joiValSchema.validate(data);
};

// Login validation
const loginValidation = (data) => {
    const joiValSchema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
    return joiValSchema.validate(data);
  };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;