const dotenv = require('dotenv');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(
  `어플리케이션 서버를 다음 환경으로 시작합니다: ${process.env.NODE_ENV}`
);

const envFound = dotenv.config(); // dotenv를 사용하여 환경 변수도 읽어온다.
// .env 파일이 없으면 에러를 던진다
if (envFound.error) {
  throw new AppError(
    commonErrors.configError,
    "Couldn't find .env file",
    false
  );
}

// mongoDB 연결을 위한 URI값이 있는 지 체크
if (process.env.MONGODB_URI === undefined) {
  throw new AppError(
    commonErrors.configError,
    500,
    '어플리케이션을 시작하려면 Mongo DB URI(MONGODB_URI) 환경변수가 필요합니다.'
  );
}

module.exports = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  mongoDBUri: process.env.MONGODB_URI,
};
