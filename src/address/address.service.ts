import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddressDto.dto';

@Injectable()
export class AddressService {

    constructor(@InjectRepository(AddressEntity) private readonly addressRepository: Repository<AddressEntity>) {
    }

    async create(createAddressDto: CreateAddressDto, userId: number) {
        return await this.addressRepository.save({
            ...createAddressDto,
            userId,
        });
    }
}
