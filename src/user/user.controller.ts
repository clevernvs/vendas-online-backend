import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @Get()
    async getAll(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAll()).map(
            (userEntity) => new ReturnUserDto(userEntity)
        );
    }

    @Get('/:userId')
    async getById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.userService.getByIdUsingRelations(userId));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.create(createUserDto);
    }

}
