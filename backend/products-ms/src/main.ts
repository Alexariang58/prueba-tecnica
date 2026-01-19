import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: env.MS_HOST,
        port: env.MS_PORT,
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen();
  console.log(
    `Products microservice listening on ${env.MS_HOST}:${env.MS_PORT}`,
  );
}
bootstrap().catch((err) => {
  console.error('Failed to bootstrap the microservice', err);
  process.exit(1);
});
