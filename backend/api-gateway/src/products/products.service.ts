import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { mapRpcToHttp } from '../common/errors/map-rcp-to-http';
import { Product } from './types/product.type';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(@Inject('PRODUCTS_MS') private readonly client: ClientProxy) {}

  async findAll(): Promise<Product[]> {
    try {
      return await firstValueFrom(
        this.client.send<Product[]>({ cmd: 'get_products' }, {}),
      );
    } catch (err) {
      mapRpcToHttp(err);
    }
  }

  async create(dto: CreateProductDto): Promise<Product> {
    try {
      return await firstValueFrom(
        this.client.send<Product>({ cmd: 'create_product' }, dto),
      );
    } catch (err) {
      mapRpcToHttp(err);
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Sending delete_product - id: ${id}, type: ${typeof id}`);
    try {
      await firstValueFrom(
        this.client.send<void>({ cmd: 'delete_product' }, id),
      );
    } catch (err) {
      this.logger.error('Error in delete_product', err);
      mapRpcToHttp(err);
    }
  }
}
