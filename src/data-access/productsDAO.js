const { Product } = require('./models/Products');

class ProductDAO {

  // 상품 목록 조회
  async getProductsByCategory(category) {
    try {
      if (!category) {
        return null;
      }
      
      const products = await Product.find({ category });
      return products;
    } catch (error) {
      console.error(error);
      throw new Error('상품 목록 조회에 실패하였습니다.');
    }
  }

  // 상품 상세정보 조회 
  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      console.error(error.message);
      throw new Error('상품 상세정보 조회에 실패하였습니다.');
    }
  }

    // 상품 정보 DB에 저장
  async createProduct(productData) {
    try {
      const postProduct = new Product(productData);
      await postProduct.save();
      return postProduct;
    } catch (error) {
      console.error(error.message);
      throw new Error('상품 저장에 실패하였습니다.');
    }
  }
}

module.exports = new ProductDAO();