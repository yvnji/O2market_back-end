const userSchema = require("./user");
const productsSchema = require("./products");
const productsJoi = require("./products-joi");
const orderSchema = require("./order");
module.exports = {
    userSchema,
    productsSchema,
    orderSchema,
    productsJoi
};

