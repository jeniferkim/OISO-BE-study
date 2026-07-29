import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  // NestJS 애플리케이션 객체를 만드는 부분. AppModule을 시작점으로 읽음.
  const app = await NestFactory.create(AppModule);

  // 전역 설정 적용
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 필드 제거
      transform: true, // 요청값을 DTO 타입이나 파라미터 타입에 맞게 변환하는 기능을 활성화
    }),
  );

  // 서버 실행
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
