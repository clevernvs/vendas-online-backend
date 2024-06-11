import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @Get()
    async getAll(): Promise<UserEntity[]> {
        return this.userService.getAll();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.create(createUserDto);
    }

}
