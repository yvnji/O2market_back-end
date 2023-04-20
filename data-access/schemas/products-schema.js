const Schema = require('mongoose');

const ProductSchema = new Schema({
    productId: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
    },
    categoryType: {
        type: Boolean,
        required: true,
    },
});

module.exports = ProductSchema;