import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { ROLE } from 'src/user/dto/role-enum';
import { IUserRepository } from 'src/user/interfaces/IUserRepository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { CredentialsDto } from './dto/credential.dto';
import { IAuthService } from './interfaces/IAuthService';

@Injectable()
export class AuthService extends IAuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async userSignUp(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.userRepository.createUser(createUserDto, ROLE.USER);

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return {
      token,
    };
  }

  async signIn(credentialsDto: CredentialsDto): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: credentialsDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }
}
