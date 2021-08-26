import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
export abstract class IUserService {
  abstract findAll(): Promise<User[]>;
  abstract find(userId: string): Promise<User>;
  abstract updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User>;
}
