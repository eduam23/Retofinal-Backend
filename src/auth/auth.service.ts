import { JwtPayload } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) { }

    signUp(createUserDto: CreateUserDto): Promise<void> {
        return this.usersRepository.createUser(createUserDto);
    }


    async signIn(
        authCredentials: AuthCredentialsDto
    ): Promise<{ }> {

        const { username, password } = authCredentials;
        const user = await this.usersRepository.findOne({username});

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const token: string = await this.jwtService.sign(payload);
            const { name, last_name, email } = user;
            return { user: {
                token,
                name,
                last_name,
                email,
                user_id: user.username
            } }
        }else {
            throw new UnauthorizedException('Please check your login credentials');
        }
   }
}
