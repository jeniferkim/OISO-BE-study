import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // 스웨거 문서 전체의 기본 설정을 만드는 객체
  const swaggerConfig = new DocumentBuilder()
    .setTitle('OISO Backend Study API') // 제목
    .setDescription('NestJS 백엔드 학습용 API 문서') // 설명
    .setVersion('1.0') // 버전
    .addBearerAuth() // Bearer 인증 사용. JWT를 사용하는 API라는 걸 스웨거에 알려줌
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, document);

  // 서버 실행
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
