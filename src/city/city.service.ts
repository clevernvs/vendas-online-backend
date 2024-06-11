import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {
    }

    async getAllByStateId(stateId: number): Promise<CityEntity[]> {

        const cities: CityEntity[] = await this.cacheManager.get(`${stateId}`);

        if (!cities) {
            return await this.cityRepository.find({
                where: {
                    stateId,
                }
            });
        }

        await this.cacheManager.set(`${cities}`, cities);

        return cities;
    }
}
