const ProductDAO = require('./productsDAO');
const { sanitizeObject, buildResponse } = require('./utils');

class ProductService {
  async getProductsByCategory(category) {
    const products = await ProductDAO.getProductsByCategory(category);
    if (!products) {
      return buildResponse(null, '카테고리가 없습니다.');
    }
    return buildResponse(products);
  }

  async getProductById(id) {
    const product = await ProductDAO.getProductById(id);
    if (!product) {
      return buildResponse(null, '상품이 존재하지 않습니다.');
    }
    return buildResponse(product);
  }

  async createProduct(productData) {
    const cleanedProductData = sanitizeObject(productData);
    const newProduct = await ProductDAO.createProduct(cleanedProductData);
    if (!newProduct) {
      return buildResponse(null, '상품 저장에 실패하였습니다.');
    }
    return buildResponse(newProduct);
  }
}

module.exports = new ProductService();