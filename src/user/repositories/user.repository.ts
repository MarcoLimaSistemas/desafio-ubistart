import { InternalServerErrorException } from '@nestjs/common';
import { CredentialsDto } from 'src/auth/dto/credential.dto';
import { EntityRepository, Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { ROLE } from '../dto/role-enum';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/IUserRepository';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  async createUser(createUserDto: CreateUserDto, role: ROLE): Promise<User> {
    const user = new User();
    Object.assign<User, CreateUserDto>(user, createUserDto);
    user.role = role;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error ao cadastrar usuário.');
    }
  }

  async resetPassword(email: string, password: string): Promise<void> {
    const user = await this.findOne(
      { email },
      {
        select: this.getCols(this),
      },
    );
    user.password = password;
    if (!user) {
      return null;
    }
    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Error ao recuperar senha.');
    }
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;

    const user = await this.findOne(
      { email },
      {
        select: this.getCols(this),
      },
    );

    if (!user) {
      return null;
    }

    if (await user.checkPassword(password)) {
      return user;
    }
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const { email, name } = updateUserDto;
    user.email = email ?? user.email;
    user.name = name ?? user.name;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error ao atualizar usuário.');
    }
  }

  private getCols<T>(repository: Repository<T>): (keyof T)[] {
    return repository.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof T)[];
  }
}
