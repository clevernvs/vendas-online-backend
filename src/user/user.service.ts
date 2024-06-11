import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async getAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id: id }
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado.')
        }

        return user;
    }

    async getByIdUsingRelations(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: { id: id },
            relations: ['addresses']
        });
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {

        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

        return await this.userRepository.save({
            ...createUserDto,
            password: passwordHashed,
        });
    }

}
