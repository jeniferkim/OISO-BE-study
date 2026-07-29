import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 필드 제거
      transform: true, // 요청값을 DTO 타입이나 파라미터 타입에 맞게 변환하는 기능을 활성화
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
