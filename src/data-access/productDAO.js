const { Product } = require('./models');

class ProductDAO {
  // 상품 목록 조회
  async findByCategory(category) {
    try {
      const products = await Product.findById(category).lean();
      return products;
    } catch (error) {
      console.error(error);
      throw new AppError(commonErrors.databaseError, 500, 'DB에 문제가 발생하여 상품 데이터를 가져오지 못했습니다');
    }
  }

  // 상품 상세정보 조회
  async getById(id) {
    try {
      const product = await Product.findById(id).lean();
      return product;
    } catch (error) {
      console.error(error);
      throw new AppError(commonErrors.databaseError, 500, 'DB에 문제가 발생하여 상품 상세정보 데이터를 가져오지 못했습니다');
    }
  }

  // 상품 정보 DB에 저장
  async create(product) {
    try {
      const newProduct = await Product(product).toObject();
      return newProduct;
    } catch (error) {
      console.error(error);
      throw new AppError(commonErrors.databaseError, 500, 'DB에 문제가 발생하여 상품을 저장하지 못했습니다');
    }
  }
}

const productDAO = new ProductDAO();
module.exports = { productDAO };
