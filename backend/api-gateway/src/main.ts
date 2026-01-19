import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(env.GATEWAY_PORT);
  console.log(
    `API Gateway running on http://localhost:${env.GATEWAY_PORT}/api`,
  );
}
bootstrap().catch((err) => {
  console.error('Failed to bootstrap API Gateway', err);
  process.exit(1);
});
