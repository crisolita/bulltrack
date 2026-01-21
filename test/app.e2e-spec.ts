import {
  Test,
  TestingModule,
} from 'bulltrack-api/node_modules/@nestjs/testing';
import { INestApplication } from 'bulltrack-api/node_modules/@nestjs/common';
import request from 'bulltrack-api/node_modules/@types/supertest';
import { App } from 'bulltrack-api/node_modules/@types/supertest/types';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
