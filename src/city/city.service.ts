import { Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepo: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async findById(id: number): Promise<CityEntity> {
    const city = await this.cityRepo.findOne({ where: { id: id } });

    if (!city) {
      throw new NotFoundException(`Cidade não encontrada.`);
    }

    return city;
  }

  async getAllByStateId(state_id: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(`state_${state_id}`, () =>
      this.cityRepo.find({ where: { state_id } }),
    );
  }
}
