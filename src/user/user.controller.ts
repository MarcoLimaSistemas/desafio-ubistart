import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from './entities/user.entity';
import { IUserService } from './interfaces/IUserService';

@Controller('users')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @Get('/')
  @UseGuards(AuthGuard(), RolesGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/one')
  async findOne(): Promise<User> {
    return await this.userService.find('1');
  }
}
