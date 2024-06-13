import { Injectable } from '@nestjs/common';
import { StateEntity } from './entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepo: Repository<StateEntity>,
  ) {}

  async getAll(): Promise<StateEntity[]> {
    return this.stateRepo.find();
  }
}
