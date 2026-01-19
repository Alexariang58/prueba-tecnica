import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { mapRpcToHttp } from '../common/errors/map-rcp-to-http';
import { Product } from './types/product.type';

@Injectable()
export class ProductsService {
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
    try {
      await firstValueFrom(
        this.client.send<void>({ cmd: 'delete_product' }, id),
      );
    } catch (err) {
      mapRpcToHttp(err);
    }
  }
}
