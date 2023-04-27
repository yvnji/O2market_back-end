const Joi = require('joi');
// const { Types } = require('mongoose');

const UserJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  roleType: Joi.boolean().default(true).required(),
  //유효성 검사에 필요한 데이터는 req.headers에서 가져오는 authorization 값
  //authorization 값은 bearer로 시작하는 JWT 토큰 문자열
  authorization: Joi.string().required(),
});

module.exports = UserJoiSchema;
