import { User } from './user.entity';
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(createUserDto: CreateUserDto): Promise<void> {

        const { username, password, name, last_name, email } = createUserDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({
            username,
            password: hashedPassword,
            name,
            last_name,
            email
        })

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === 11000) { //duplicate username
                throw new ConflictException('Username already exists');
            }else if(error.code === undefined){
                return
            }
            else{
                console.log(error.code);
                throw new InternalServerErrorException();
            }
        }
    }

}