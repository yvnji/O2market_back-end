const { ProductDAO } = require('../data-access');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
// const { sanitizeObject, buildResponse } = require('./utils');

class ProductService {
  async getProductsByCategory(category) {
    try {
      const products = await ProductDAO.findByCategory(category);
      return products;
    } catch (error) {
      throw new AppError(commonErrors.businessError, 500, 'Business Error로 인해 상품 데이터를 가져오지 못했습니다');
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductDAO.getById(id);
      if (!product) {
        throw new AppError(commonErrors.businessError, 500, 'Business Error: 해당 상품은 존재하지 않습니다.');
      }
      return product;
    } catch (error) {
      throw new Error(
        commonErrors.businessError, 500, 'Business Error로 인해 해당 상품의 상세정보 조회에 실패하였습니다.'
      );
    }
  }

  async createProduct(product) {
    try {
      const newProduct = await ProductDAO.create(product);
      return newProduct;
    } catch (error) {
      console.error(error);
      throw new AppError(commonErrors.businessError, 500, 'Business Error로 인해 상품 저장에 실패하였습니다.');
    }
  }
}

const productService = new ProductService();
module.exports = productService;
