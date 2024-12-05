import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'],
  });
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляет все свойства, которые не указаны в DTO
      forbidNonWhitelisted: true, // Ошибка, если есть несуществующие свойства в DTO
      transform: true, // Преобразовывает входные данные в соответствие с DTO
    }),
  );
  try {
    await app.listen(port);
  } catch (error) {
    console.error('Failed to start the server', error);
  }
  // await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
