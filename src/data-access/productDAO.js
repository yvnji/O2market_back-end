const { Product } = require('./models');

class ProductDAO {

  // 상품 목록 조회
  async getProductsByCategory(category) {
    try {
        const products = await Product.find({ category });
        return products;
    } catch (error) {
        console.error(error);
        throw new Error(`DAO: 해당 카테고리의 상품 목록 조회에 실패하였습니다.`);
    }
  }

  // 상품 상세정보 조회 
  async getProductById(id) {
    try {
      const product = await Product.findOne({ id });
      return product;
    } catch (error) {
      console.error(error);
      throw new Error('DAO: 상품 상세정보 조회에 실패하였습니다.');
    }
  }

    // 상품 정보 DB에 저장
  async createProduct(product) {
    try {
        const newProduct = await Product.create(product);
        return newProduct;
    } catch (error) {
        console.error(error);
        throw new Error('DAO: 상품 저장에 실패했습니다.');
    }
  }
}

module.exports = {
  productDAO: new ProductDAO()
};