import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { User } from 'src/user/entities/user.entity';
import { CredentialsDto } from '../dto/credential.dto';

export abstract class IAuthService {
  abstract userSignUp(createUserDto: CreateUserDto): Promise<ReturnUserDto>;
  abstract signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ user: User; token: string }>;
}
