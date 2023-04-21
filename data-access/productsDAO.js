const { Products } = require('../models/products-model');

const productsDAO = {
    // 상품 목록 조회

    // 상세 정보 조회

    // 상품 정보 DB에 저장
    async create({ productName, price, description, company }) {
        const product = new Products({ productName, price, description, company });
        await product.save();
        return product.toObject();
    },
}

module.exports = productsDAO;