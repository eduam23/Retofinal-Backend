import { Product } from './product/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/products',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        User,
        Product
      ],
    }),
    ProductModule, 
    AuthModule
  ],
})
export class AppModule {}
