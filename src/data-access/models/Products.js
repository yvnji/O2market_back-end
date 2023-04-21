const mongoose = require('mongoose');
const { ProductSchema } = require('../schemas');

exports.Product = mongoose.model('Product', ProductSchema);
