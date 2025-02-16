import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as fastcsv from 'fast-csv';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(productDto: CreateProductDto) {
    const product = this.productRepository.create(productDto);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  update(id: number, productDto: CreateProductDto) {
    return this.productRepository.update(id, productDto);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
  async exportProductsToCSV() {
    const products = await this.productRepository.find();

    const filePath = path.join(__dirname, '../../files/products.csv');

    const ws = fs.createWriteStream(filePath);

    fastcsv.write(products, { headers: true, writeHeaders: true }).pipe(ws);

    return filePath;
  }
}
