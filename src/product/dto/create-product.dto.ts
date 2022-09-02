import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {

    @IsNotEmpty()
    id: number;

    @IsString()
    @MinLength(3)
    title: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(1200)
    description: string;

    @IsNotEmpty()
    @MinLength(3)
    category: string;

    @IsNotEmpty()
    @MinLength(1)
    image: string;

    @IsNotEmpty()
    rating: string;
}