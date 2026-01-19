import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: jest.Mocked<Repository<Product>>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 1000,
    stock: 10,
  };

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [mockProduct];
      repository.find.mockResolvedValue(products);

      const result = await service.findAll();

      expect(result).toEqual(products);
      expect(repository.find).toHaveBeenCalledWith({ order: { id: 'DESC' } });
    });

    it('should throw RpcException on database error', async () => {
      repository.find.mockRejectedValue(new Error('DB Error'));

      await expect(service.findAll()).rejects.toThrow(RpcException);
    });
  });

  describe('create', () => {
    const createDto = { name: 'New Product', price: 500, stock: 5 };

    it('should create and return a product', async () => {
      repository.create.mockReturnValue(mockProduct);
      repository.save.mockResolvedValue(mockProduct);

      const result = await service.create(createDto);

      expect(result).toEqual(mockProduct);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(mockProduct);
    });

    it('should throw RpcException on database error', async () => {
      repository.create.mockReturnValue(mockProduct);
      repository.save.mockRejectedValue(new Error('DB Error'));

      await expect(service.create(createDto)).rejects.toThrow(RpcException);
    });
  });

  describe('remove', () => {
    it('should delete a product successfully', async () => {
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      const result = await service.remove(1);

      expect(result).toEqual({ deleted: true });
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw RpcException when product not found', async () => {
      repository.delete.mockResolvedValue({ affected: 0, raw: {} });

      await expect(service.remove(999)).rejects.toThrow(RpcException);
    });

    it('should throw RpcException on database error', async () => {
      repository.delete.mockRejectedValue(new Error('DB Error'));

      await expect(service.remove(1)).rejects.toThrow(RpcException);
    });
  });
});
