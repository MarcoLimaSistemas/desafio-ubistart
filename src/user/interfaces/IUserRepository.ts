import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { ROLE } from '../dto/role-enum';
import { User } from '../entities/user.entity';
import { CredentialsDto } from '../../auth/dto/credential.dto';
import { UpdateUserDto } from './../dto/update-user.dto';

export interface IUserRepository extends Repository<User> {
  createUser(createUserDto: CreateUserDto, role: ROLE): Promise<User>;

  createAdmin(): Promise<User>;

  checkCredentials(credentialsDto: CredentialsDto): Promise<User>;

  updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User>;

  resetPassword(email: string, password: string): Promise<void>;
}
