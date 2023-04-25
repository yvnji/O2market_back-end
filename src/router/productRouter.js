const express = require('express');
const { productService } = require('../service');

const productRouter = express.Router();

// 전체 상품 조회
productRouter.get('/', async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// 카테고리별 상품 목록 조회
productRouter.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category !== undefined && category !== null && category !== '') {
      const products = await productService.getProductsByCategory(category);
      res.json(products);
    }
  } catch (error) {
    next(error);
  }
});

// 상품 상세정보 조회
productRouter.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);
    if (!product) {
      next();
      return;
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// 상품 정보 DB에 저장 - 관리자
// productRouter.post('/save', productMiddleware.validateProduct, async (req, res, next) => {
//   try {
//     const { productName, description, price, imageUrl, company, category } = req.body;
//     const newProduct = {
//       productName,
//       description,
//       price,
//       imageUrl,
//       company,
//       category,
//     };
//     const createProduct = await productService.createProduct({ newProduct });
//     res.status(201).json(createProduct);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = productRouter;
