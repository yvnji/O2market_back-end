const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const { OrderJoiSchema } = require('../data-access/joiSchemas');

// 주문 요청 검증
const orderValidator = (req, res, next) => {
  const { error } = OrderJoiSchema.validate(req.body);
  if (error) {
    return next(
      new AppError(commonErrors.requestValidationError, 400, errorMessage)
    );
  }
  ƒ;
  next();
};

// 주문 생성 시 유효성 검사
const createOrderValidator = (req, res, next) => {
  // {abortEarly는 false로 설정하면 모든 유효성 검사를 수행하고, 모든 검사 결과를 반환하므로, 모든 오류 메시지를 확인 }
  const { error } = OrderJoiSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details
      .map((errorDetail) => errorDetail.message)
      .join('\n');
    return next(
      new AppError(commonErrors.requestValidationError, 400, errorMessage)
    );
  }
  next();
};

// 주문 수정 시 유효성 검사
const updateOrderValidator = (req, res, next) => {
  const { _id: orderId } = req.params;

  const { error } = OrderJoiSchema.validate(req.body);
  if (error) {
    return next(
      new AppError(
        commonErrors.requestValidationError,
        400,
        error.details[0].message
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
