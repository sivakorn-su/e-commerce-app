import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ProductSeeder } from './seeders/ProductSeeder';
import { Product } from '../product/entities/product.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3307,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || undefined,
  database: process.env.DB_NAME || 'e-commerce',
  entities: [Product],
  synchronize: true,
});

AppDataSource.initialize()
  .then(async (dataSource) => {
    await ProductSeeder.run(dataSource);
    console.log('Seeding done!');
    process.exit(0);
  })
  .catch((error) => console.log('Error seeding data:', error));
