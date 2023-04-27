const { Product } = require('./models');

class productDAO {
  // 상품 전체 조회
  async findAll() {
    try {
      const products = await Product.find({}).lean();
      return products;
    } catch (error) {
      console.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        'DB에 문제가 발생하여 상품 데이터를 가져오지 못했습니다'
      );
    }
  }

  // 카테고리별 상품 목록 조회
  async findByCategory(category) {
    try {
      const products = await Product.find({ category }).lean();
      return products;
    } catch (error) {
      console.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        'DB에 문제가 발생하여 상품 데이터를 가져오지 못했습니다'
      );
    }
  }

  // 상품 상세정보 조회
  async getById(id) {
    try {
      const product = await Product.findOne({productId : id}).lean();
      console.log(product);
      return product;
    } catch (error) {
      console.error(error);
      throw new AppError(
          commonErrors.databaseError,
          500,
          'DB에 문제가 발생하여 상품 상세정보 데이터를 가져오지 못했습니다'
      );
    }
  }
  // 상품 추가 - 관리자
  async create(product) {
    try {
      const newProduct = new Product(product);
      const createdProduct = await newProduct.save();
      return createdProduct;
    } catch (error) {
      console.error(error);
      throw new AppError(
        commonErrors.databaseError,
        500,
        'DB에 문제가 발생하여 상품을 저장하지 못했습니다'
      );
    }
  }
}

module.exports = new productDAO();
