const { Order } = require('../data-access/models');

// 주문 요청 검증
const orderValidator = (req, res, next) => {
  const { orderId, userEmail, orderItems, orderAddr } = req.body;

  if (!orderId || !userEmail || !orderItems || !orderAddr) {
    return next(
      new AppError(
        commonErrors.requestValidationError,
        400,
        '주문은 orderId, userEmail, orderItems, orderAddr 정보가 필요합니다.'
      )
    );
  }
  next();
};

// 주문 생성 시 유효성 검사
const createOrderValidator = (req, res, next) => {
  const { userEmail, orderItems } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return next(
      new AppError(
        commonErrors.requestValidationError,
        400,
        '주문 상품은 최소 1개 이상이어야 합니다..🙏🏻'
      )
    );
  }
  if (!userEmail) {
    return next(
      new AppError(
        commonErrors.requestValidationError,
        400,
        '주문 사용자 정보가 유효하지 않습니다.😢'
      )
    );
  }
  next();
};

// 주문 수정 시 유효성 검사
const updateOrderValidator = (req, res, next) => {
  const { _id: orderId } = req.params;
  const { orderItems, userEmail } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(
      new AppError(
        commonErrors.requestValidationError,
        400,
        '주문 상품은 최소 1개 이상이어야 합니다..🙏🏻'
      )
    );
  }
  if (userEmail && (!userEmail.name || !userEmail.address)) {
    return next(
      new AppError(
        commonErrors.requestValidationError,
        400,
        '주문 사용자 정보가 유효하지 않습니다.😢'
      )
    );
  }
  if (!orderId) {
    return next(
      new AppError(
        commonErrors.requestValidationError,
        400,
        '해당 주문을 찾을 수 없습니다.🥲'
      )
    );
  }
  next();
};

module.exports = {
  orderValidator,
  createOrderValidator,
  updateOrderValidator,
};
