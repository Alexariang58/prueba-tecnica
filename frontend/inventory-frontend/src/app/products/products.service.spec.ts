import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService, CreateProductPayload } from './products.service';
import { Product } from './models/products.interfaces';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 1000,
    stock: 10,
    createdAt: '2026-01-19T00:00:00.000Z',
    updatedAt: '2026-01-19T00:00:00.000Z',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an array of products', () => {
      const mockProducts: Product[] = [mockProduct];

      service.getAll().subscribe((products) => {
        expect(products).toEqual(mockProducts);
        expect(products.length).toBe(1);
      });

      const req = httpMock.expectOne('/api/products');
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    });
  });

  describe('create', () => {
    it('should create a product and return it', () => {
      const payload: CreateProductPayload = {
        name: 'New Product',
        price: 500,
        stock: 5,
      };

      service.create(payload).subscribe((product) => {
        expect(product).toEqual(mockProduct);
      });

      const req = httpMock.expectOne('/api/products');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);
      req.flush(mockProduct);
    });
  });

  describe('remove', () => {
    it('should delete a product', () => {
      service.remove(1).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('/api/products/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
