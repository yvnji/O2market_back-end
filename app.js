const express = require('express');
const mongoose = require('mongoose');
const loader = require('./loader');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler'); // 미들웨어 (수정)

const app = express();
mongoose.connect('');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api 라우팅 (수정)
const users = require('./routes/users');
const products = require('./routes/products');
app.use('/api/users', users);
app.use('/api/products', products);

// 미들웨어 (수정)
app.use(errorHandler); 

app.listen();

module.exports = app;

