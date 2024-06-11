import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddressDto.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService,
    ) {
    }

    async create(createAddressDto: CreateAddressDto, userId: number) {

        const user = await this.userService.findById(userId);
        const city = await this.cityService.findById(createAddressDto.cityId);

        return await this.addressRepository.save({
            ...createAddressDto,
            userId: user.id,
        });
    }
}
