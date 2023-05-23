const Joi = require('joi');

const OrderJoiSchema = Joi.object({
  userId: Joi.string().required(),
  orderItems: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().required(),
        price: Joi.number().integer().required(),
        productName: Joi.string().required(),
      })
    )
    .required(),
  orderAddr: Joi.string().required(),
  deleteFlag: Joi.boolean().required(),
  deliveryState: Joi.number().required().valid(0, 1, 2),
});

module.exports = OrderJoiSchema;
