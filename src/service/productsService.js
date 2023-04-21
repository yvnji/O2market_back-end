const ProductDAO = require('../data-access');
// const { sanitizeObject, buildResponse } = require('./utils');

class ProductService {
  async getProductsByCategory(category) {
    try {
        const products = await ProductDAO.getProductsByCategory(category);
        return products;
    } catch (error) {
        throw new Error('service: 해당 카테고리의 상품 목록 조회에 실패하였습니다.');
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductDAO.getProductById(id);
      if (!product) {
        throw new Error('service: 해당 상품은 존재하지 않습니다.');
      }
      return product;
    } catch (error) {
      throw new Error('service: 해당 상품의 상세정보 조회에 실패하였습니다.');
    }
  }

  async createProduct(product) {
    try {
        const newProduct = await ProductDAO.createProduct(product);
        return newProduct;
    } catch (error) {
        console.error(error);
        throw new Error('service: 상품 저장에 실패하였습니다.');
    }
 }
}

module.exports = {
  productService: new ProductService()
};