import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductsRepository } from './product.repository';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
    AuthModule,
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
