import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { env } from '../config/env';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_MS',
        transport: Transport.TCP,
        options: {
          host: env.PRODUCTS_MS_HOST,
          port: env.PRODUCTS_MS_PORT,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
