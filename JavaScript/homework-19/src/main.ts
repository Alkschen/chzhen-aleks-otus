import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(resolve(__dirname, '../views'));
  app.useStaticAssets(resolve(__dirname, '../public'));
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();
