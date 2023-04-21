const { Router } = require('express');
// const { Product } = require('../data-access/models');
const { productsMiddleware } = require('../middleware');
const productService = require('../service');

const router = Router();

// 상품 카테고리 목록 조회
router.get('/products/:category', productsMiddleware.getProductsByCategory, async (req, res) => {

    try {
        const products = await productService.getProductsByCategory(req.params.category);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'router: 해당 카테고리의 상품 목록 조회에 실패하였습니다.' });
    }
});


// 상품 상세정보 조회 
router.get('/product/:productId', productsMiddleware.getProductById, async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.productId);
        if (!product) {
            res.status(404).json({ message: 'router: 상품이 존재하지 않습니다.' });
            return;
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'router: 상품 상세정보 조회에 실패했습니다.' });
    }
});

// 상품 정보 DB에 저장
router.post('/product', productsMiddleware.validateProduct, async (req, res) => {
    try {
        const product = req.body;
        console.log('DB 저장: product')
        const newProduct = await productService.createProduct(product);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'router: 상품 생성에 실패했습니다.' });
    }
});


module.exports = router;