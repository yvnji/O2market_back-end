const Joi = require('joi');
// const { Types } = require('mongoose');

const OrderJoiSchema = Joi.object({
  userId: Joi.string().required(),
  orderItems: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().integer().min(0).required(),
      })
    )
    .min(1)
    .required(),
  orderAddr: Joi.object({
    street: Joi.string().required(),
  }).required(),
  deleteFlag: Joi.boolean().required(),
  deliveryState: Joi.number().required().valid(0, 1, 2),
});

module.exports = OrderJoiSchema;
