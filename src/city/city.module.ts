import { CacheModule as CacheModuleNest, Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    CacheModuleNest.register({
      ttl: 90000000,
    }),
    CacheModule,
    TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService]
})

export class CityModule { }
