const http = require('http');
const express = require('express');
const loader = require('./loader');
const config = require('./config');

const AppError = require('./misc/AppError');
const commonErrors = require('./misc/commonErrors');
const apiRouter = require('./router');
const cors = require('cors');

async function create() {
  await loader.connectMongoDB();

  console.log('express application을 초기화합니다.');
  const expressApp = express();

  expressApp.use(express.json());

  expressApp.get('/health', (req, res) => {
    res.json({
      status: 'OK',
    });
  });

  expressApp.use(
    cors({
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // 접근 권한을 부여하는 도메인 ( 5500번 포트 사용 x)
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );

  expressApp.use('/api/v1', apiRouter.v1);

  expressApp.use((req, res, next) => {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        404,
        'Resource not found'
      )
    );
  });

  // 에러 핸들러 등록
  expressApp.use((error, req, res) => {
    console.log(error);
    res.statusCode = error.httpCode ?? 500;
    res.json({
      data: null,
      error: error.message,
    });
  });
  console.log('express application 준비가 완료되었습니다.');

  const server = http.createServer(expressApp);

  const app = {
    start() {
      server.listen(config.port);
      server.on('listening', () => {
        console.log(`🚀 O2 마켓 포트 ${config.port}에서 운영중입니다.`);
      });
    },

    stop() {
      console.log('🔥 서버를 중지 작업을 시작합니다.');
      this.isShuttingDown = true;
      return new Promise((resolve, reject) => {
        server.close(async (error) => {
          if (error !== undefined) {
            console.log(`- HTTP 서버 중지를 실패하였습니다: ${error.message}`);
            reject(error);
          }
          console.log('- 들어오는 커넥션을 더 이상 받지 않도록 하였습니다.');
          await loader.disconnectMongoDB();
          console.log('- DB 커넥션을 정상적으로 끊었습니다.');
          console.log('🟢 서버 중지 작업을 성공적으로 마쳤습니다.');
          this.isShuttingDown = false;
          resolve();
        });
      });
    },
    isShuttingDown: false,
    _app: expressApp,
  };

  return app;
}

module.exports = create;
