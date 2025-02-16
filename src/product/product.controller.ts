import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Response } from 'express';

@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: CreateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }

  @Get('export')
  async export(@Res() res: Response) {
    const filePath = await this.productService.exportProductsToCSV();

    res.download(filePath, 'products.csv', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Could not download the file.' });
      }
    });
  }
}
