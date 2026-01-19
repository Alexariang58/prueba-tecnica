import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get_products' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload() id: number) {
    this.logger.log(`delete_product received - id: ${id}, type: ${typeof id}`);
    return this.productsService.remove(id);
  }
}
