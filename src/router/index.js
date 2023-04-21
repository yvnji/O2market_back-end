
const express = require("express");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
const v1Router = express.Router();

v1Router.use("/users", userRouter);
v1Router.use("/orders", orderRouter);

module.exports = {
    v1: v1Router, // API 버저닝을 위해 v1Router는 v1에 할당
};
