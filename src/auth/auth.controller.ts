import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/signup')
    signup(@Body() createUserDto: CreateUserDto): Promise<void>{
       return this.authService.signUp(createUserDto);
    }

    @Post('/login')
    login(
        @Body() authCredentialsDto: AuthCredentialsDto
        ): Promise<{ }>{
       return this.authService.signIn(authCredentialsDto);
    }
}