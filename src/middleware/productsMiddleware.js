const { ProductJoiSchema } = require('../data-access/schemas');
const { Products } = require('../data-access/models/Products');

// 상품 정보 저장 시 입력값 검증 미들웨어 
function validateProduct(req, res, next) {
    const { error } = ProductJoiSchema.validate(req.body);

    if(error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }

    next();
}

// 상품 정보 조회 에러처리 미들웨어
async function getProduct(req, res, next) {
    try {
        const product = await Products.findById(req.params.productId);
        if(!product) {
            res.status(404).json({ message: '상품이 존재하지 않습니다.'});
            return;
        }
        req.product = product;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send('상품 조회에 실패했습니다.');
    }
}

module.exports = { validateProduct, getProduct };