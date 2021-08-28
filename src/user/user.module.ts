import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserService } from './interfaces/IUserService';
import { UserRepository } from './repositories/user.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [{ provide: IUserService, useClass: UserService }],
  exports: [{ provide: IUserService, useClass: UserService }],
})
export class UserModule {}
