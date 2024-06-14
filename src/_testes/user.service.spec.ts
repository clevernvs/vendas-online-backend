import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from 'src/_mocks/user.mock';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { createUserMock } from 'src/_mocks/create-user.mock';

describe('User2Service', () => {
  let service: UserService;
  let userRepo: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockRejectedValue(userEntityMock),
            save: jest.fn().mockRejectedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepo = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepo).toBeDefined();
  });

  it('should return user in findByEmail', () => {
    const user = await service.findByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findByEmail', () => {
    jest.spyOn(userRepo, 'findOne').mockResolvedValue(undefined);

    expect(service.findByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return error in findByEmail (error DB)', () => {
    jest.spyOn(userRepo, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return user in findById', () => {
    const user = await service.findById(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findById', () => {
    jest.spyOn(userRepo, 'findOne').mockResolvedValue(undefined);
    expect(service.findById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return error in findById (error DB)', () => {
    jest.spyOn(userRepo, 'findOne').mockRejectedValue(new Error());
    expect(service.findById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in getByIdUsingRelations', () => {
    const user = await service.getByIdUsingRelations(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exist', () => {
    expect(service.create(createUserMock)).rejects.toThrowError();
  });

  it('should return if user not exist', () => {
    jest.spyOn(userRepo, 'findOne').mockResolvedValue(undefined);
    const user = await service.create(createUserMock);

    expect(user).toEqual(userEntityMock);
  });
});
