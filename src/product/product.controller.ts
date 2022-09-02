import { CreateProductDto } from './dto/create-product.dto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productsService: ProductService) { }

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProductById(
    @Param('id') id: any,
  ): Promise<Product> {
    return this.productsService.getProduct(id);
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }
}
