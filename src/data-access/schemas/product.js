const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  category: {
    type: Number, // 카테고리 종류(채소 : 0/과일 : 1)
    required: true,
  },
});

module.exports = productSchema;
