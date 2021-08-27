import { User } from '../entities/user.entity';

export class ReturnUserDto {
  token: string;
  user: User;
}
