const Joi = require('joi');
const { Types } = require('mongoose');

const ProductJoiSchema = Joi.object({
  productId: Joi.number().required(),
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  imageUrl: Joi.string().uri().required(),
  company: Joi.string().required(),
  category: Joi.string().pattern(new RegExp(Types.ObjectId.isValid())).required(),
});

module.exports = ProductJoiSchema;
