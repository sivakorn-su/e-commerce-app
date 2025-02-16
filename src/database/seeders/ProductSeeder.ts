import { DataSource } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { faker } from '@faker-js/faker';

export class ProductSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product);

    // กำหนด Type ของ products array ให้ชัดเจน
    const products: Product[] = [];

    for (let i = 0; i < 10; i++) {
      const product = productRepository.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
        stock: faker.number.int({ min: 0, max: 100 }),
      });

      products.push(product);
    }

    await productRepository.save(products);
    console.log('Product seeding completed.');
  }
}
