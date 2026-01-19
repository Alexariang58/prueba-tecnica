import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const dataSource = app.get(DataSource);
    const repo = dataSource.getRepository(Product);

    await repo.clear();

    const products: Partial<Product>[] = [
      { name: 'Teclado mecánico', price: 250000, stock: 15 },
      { name: 'Mouse inalámbrico', price: 120000, stock: 30 },
      { name: 'Monitor 24"', price: 650000, stock: 8 },
      { name: 'Base laptop', price: 90000, stock: 25 },
      { name: 'Audífonos', price: 180000, stock: 12 },
    ];

    await repo.insert(products);

    console.log(`Seed OK: ${products.length} productos insertados.`);
  } finally {
    await app.close();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
