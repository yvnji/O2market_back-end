const { Router } = require('express');
const { Product } = require('../data-access/models');
const { productsMiddleware } = require('../middleware');

const router = Router();

// 상품 카테고리 목록 조회
router.get('/products/:category', async (req, res) => {

    try {
        const category = parseInt(req.params.category);

        const products = await Product.find({ category: category });
        if (products.length === 0) {
            res.status(404).json({ message: '해당 카테고리의 상품이 없습니다.' });
            return;
        }
    
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 목록 조회에 실패했습니다.' });
    }
});


// 상품 상세정보 조회 
router.get('/products/:id', productsMiddleware.getProduct, async (req, res) => {
    try {
        const product = req.product;

        if (!product) {
            res.status(404).json({ message: '상품이 존재하지 않습니다.' });
            return;
        }

        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('상품 상세정보 조회에 실패하였습니다.')
    }
});

// 상품 정보 DB에 저장
router.post('/products', productsMiddleware.validateProduct, async (req, res) => {
    try {
        const { productName, price, description, company } = req.body;

        let postProduct = new Product({
            productName,
            price,
            description,
            company,
        });

        await postProduct.save();
        res.json(postProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('상품 저장에 실패하였습니다.')
    }
});


module.exports = router;