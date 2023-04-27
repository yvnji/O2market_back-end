const express = require('express');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/products', productRouter);
v1Router.use('/orders', orderRouter);

module.exports = {
  v1: v1Router,
};
