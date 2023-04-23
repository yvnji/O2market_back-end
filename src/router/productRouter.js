const { Router } = require('express');
// const { Product } = require('../data-access/models');
const { productMiddleware } = require('../middleware');
const { productService } = require('../service');

const router = Router();

// 상품 카테고리 목록 조회
router.get('/', async (req, res, next) => {
  const { category } = req.query;
  try {
    if (category !== undefined && category !== null && category !== '') {
      const products = await productService.getProductsByCategory(req.params.category);
      res.json({ data: products, error: null });
    }
  } catch (error) {
    next(error);
    // console.error(error);
    // res.status(500).json({ message: 'router: 해당 카테고리의 상품 목록 조회에 실패하였습니다.' });
  }
});

// 상품 상세정보 조회
router.get('/:productId', async (req, res, next) => {
    try {
      const product = await productService.getProductById(req.params.productId);
      if (!product) {
        //res.status(404).json({ message: 'router: 상품이 존재하지 않습니다.' });
        next();
        return;
      }
      res.json(product);
    } catch (error) {
        next(error);
    //   console.error(error);
    //   res.status(500).json({ message: 'router: 상품 상세정보 조회에 실패했습니다.' });
    }
  }
);

// 상품 정보 DB에 저장
router.post('/', productMiddleware.validateProduct, async (req, res, next) => {
    try {
      const product = req.body;
      const newProduct = await productService.createProduct(product);
      res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    //   console.error(error);
    //   res.status(500).json({ message: 'router: 상품 생성에 실패했습니다.' });
    }
  }
);

module.exports = router;
