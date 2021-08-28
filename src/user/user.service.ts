import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/IUserRepository';
import { IUserService } from './interfaces/IUserService';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async find(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return await this.userRepository.find(options);
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.updateUser(user, updateUserDto);
  }
}
