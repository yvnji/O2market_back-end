const Joi = require('joi');

const UserJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  roleType: Joi.boolean().default(true).required(),
  authorization: Joi.string().required(),
});

module.exports = UserJoiSchema;
