import { AddressEntity } from '../entities/address.entity';
import { ReturnCityDto } from 'src/city/dtos/return-city.dto';

export class ReturnAddressDto {
  complement: string;
  number_address: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.number_address = address.number_address;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
