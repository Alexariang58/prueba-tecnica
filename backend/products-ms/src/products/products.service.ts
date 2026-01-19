import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { RpcException } from '@nestjs/microservices';
import { rpc } from '../common/errors/rcp';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    try {
      return await this.productsRepo.find({ order: { id: 'DESC' } });
    } catch (err: unknown) {
      this.logger.error('DB error on findAll', err as Error);
      throw rpc.internal('Error fetching products');
    }
  }

  async create(dto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productsRepo.create(dto);
      return await this.productsRepo.save(product);
    } catch (err: unknown) {
      this.logger.error('DB error on create', err as Error);
      throw rpc.badRequest('Error creating product');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.productsRepo.delete(id);

      if (result.affected === 0) {
        throw rpc.notFound(`Product with id ${id} not found`);
      }
    } catch (err: unknown) {
      if (err instanceof RpcException) throw err;

      this.logger.error('DB error on remove', err as Error);
      throw rpc.badRequest('Error deleting product');
    }
  }
}
