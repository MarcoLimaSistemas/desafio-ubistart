import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { CredentialsDto } from './dto/credential.dto';
import { IAuthService } from './interfaces/IAuthService';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @Post('/signup')
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    return await this.authService.userSignUp(createUserDto);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentialsDto: CredentialsDto,
  ): Promise<ReturnUserDto> {
    return await this.authService.signIn(credentialsDto);
  }
}
