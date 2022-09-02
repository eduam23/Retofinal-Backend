import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductsRepository) private productRepository: Repository<Product>
    ){}

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async getProduct(id_any: any): Promise<Product> {
        let id = Number(id_any);
        const product = await this.productRepository.findOne({ id });
        return product;
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product>{
        const { id, title, price, description, category, image, rating } = createProductDto;
        const product = this.productRepository.create({
            _id: uuid(),
            id,
            title,
            price,
            description,
            category,
            image,
            rating
        });

        return this.productRepository.save(product);
    }
}
