const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true, 
    },
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
        type: Number,
        required: true,
    },
});

module.exports = ProductSchema;