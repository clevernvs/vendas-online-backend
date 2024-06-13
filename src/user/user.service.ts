import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Email não encontrado.');
    }

    return user;
  }

  async getByIdUsingRelations(id: number): Promise<UserEntity> {
    return this.userRepo.findOne({
      where: { id },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    return await this.userRepo.save({
      ...createUserDto,
      password: passwordHashed,
    });
  }
}
