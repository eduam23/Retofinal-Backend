import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message:'Password is too weak'})
    password: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    last_name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    email: string;
}