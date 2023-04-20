const mongoose = require('mongoose');
const { ProductSchema } = require('../schemas/products-schema');

exports.Products = mongoose.model('Product', ProductSchema);