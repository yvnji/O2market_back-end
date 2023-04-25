const jwt = require('jsonwebtoken');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const { UserJoiSchema } = require('../data-access/joiSchemas');

function loginRequired(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers['authorization']?.split(' ')[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
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

  // 해당 token 이 정상적인 token인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);
    //로그인 인증과 관련된 미들웨어에서는 유저 조이 스키마를 적용하지 않아도 되지만,
    //유저 정보 수정 등 다른 기능을 구현할 때는 유저 조이 스키마를 적용하여 유효성 검증을 수행
    const { error } = UserJoiSchema.validate(jwtDecoded.user);

    if (error) {
      throw new Error(error.message);
    }

    const userId = jwtDecoded.userId;

    // 라우터에서 req.currentUserId를 통해 유저의 id에 접근 가능하게 됨
    req.currentUserId = userId;

    next();
  } catch (error) {
    // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
    // 403 코드로 JSON 형태로 프론트에 전달함.
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
