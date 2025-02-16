import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CacheModule.register({
      ttl: 3600,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
