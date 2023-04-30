const jwt = require('jsonwebtoken');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const { UserJoiSchema } = require('../data-access/joiSchemas');

function loginRequired(req, res, next) {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken || userToken === 'null') {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
    return next(
      new AppError(
        commonErrors.requestValidationError,
        403,
        'forbidden-approach, 로그인한 유저만 사용할 수 있는 서비스입니다.'
      )
    );
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const userId = jwtDecoded.userId;

    req.currentUserId = userId;

    next();
  } catch (error) {
    return next(
      new AppError(
        commonErrors.requestValidationError,
        403,
        'forbidden-approach, 정상적인 토큰이 아닙니다.'
      )
    );
  }
}

module.exports = { loginRequired };
