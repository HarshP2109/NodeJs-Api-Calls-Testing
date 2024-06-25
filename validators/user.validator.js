const Joi = require('joi');

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().required(),
    isDeleted: Joi.boolean(),
  });
  return schema.validate(user);
};

const validateUserId = (params) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
  });
  return schema.validate(params);
};

module.exports = {
  validateUser,
  validateUserId,
};
