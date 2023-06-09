const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      ref: 'products',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      ref: 'products',
      required: true,
    },
  },
  {
    collection: 'orderItems',
  }
);

module.exports = orderItemsSchema;
