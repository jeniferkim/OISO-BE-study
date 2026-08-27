import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types';

import { AppModule } from '../src/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/profile (GET) - 토큰이 없으면 401', () => {
    return request(app.getHttpServer()).get('/auth/profile').expect(401);
  });

  it('/saved-routes (GET) - 토큰이 없으면 401', () => {
    return request(app.getHttpServer()).get('/saved-routes').expect(401);
  });
});
