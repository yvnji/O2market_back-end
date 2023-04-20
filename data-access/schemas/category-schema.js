const Schema = require('mongoose');

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
})

module.exports = CategorySchema;