const { Router } = require('express');
const { Products } = require('./data-access/models/products-model');
const { Category } = require('./data-access/models/category-model');
const { getProduct, validateProduct } = require('./middleware');

const router = Router();

// 상품 목록 조회
router.get('/products/:category', async (req, res) => {
    try {
        const categoryTitle = req.params.category;

        const category = await Category.findOne({ title: categoryTitle });
        if(!category) {
            res.status(404).json({ message: '카테고리가 없습니다.'});
            return;
        }

        const products = await Products.find({ category: category._id });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 목록 조회에 실패했습니다.'})
    }
});


// 상품 클릭 시 상세정보 조회
router.get('/products/:id', getProduct, async (req, res) => {
    try {
        const product = req.product;

        if (!product) {
            res.status(404).json({ message: '상품이 존재하지 않습니다.' });
            return;
        }

        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('상품 정보 조회에 실패하였습니다.')
    }
});

// 상품 정보 DB에 저장
router.post('/products', validateProduct, async (req, res) => {
    try {
        const { productName, price, description, company } = req.body;

        let postProduct = new Products({
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