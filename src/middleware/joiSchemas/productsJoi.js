const Joi = require('joi');

const ProductJoiSchema = Joi.object({
  productId : Joi.number().required(),
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  imageUri: Joi.string().uri().required(),
  company: Joi.string().required(),
  category: Joi.number().required(),
});

module.exports = ProductJoiSchema;
