// const { ProductJoiSchema } = require('../data-access/schemas');
// const { Products } = require('../data-access/models/Products');
// const ProductService = require('../service');

// 카테고리 상품목록 미들웨어
// async function getProductsByCategory(req, res, next) {
//     try {
//         const category = req.params.category;
//         const products = await ProductService.getProductsByCategory(category);
//         req.products = products;
//         next();
//     } catch (error) {
//         next(error);
//     }
// }

// 상품 정보 조회 에러처리 미들웨어
// async function getProductById(req, res, next) {
//   try {
//     const id = req.params.productId;
//     const product = await ProductService.getProductById(id);
//     if (!product) {
//       next();
//       return;
//     }
//     req.product = product;
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

// 상품 정보 저장 시 입력값 검증 미들웨어
function validateProduct(req, res, next) {
  const { name, price, description, manufacturer } = req.body;
  if (!name || !price || !description || !manufacturer) {
    return res.status(400).json({ message: 'middleware: 필수 입력값이 없습니다.' });
  }
  next();
}

module.exports = {
  validateProduct,
};
