import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserService } from './interfaces/IUserService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [{ provide: IUserService, useClass: UserService }],
  controllers: [UserController],
})
export class UserModule {}
