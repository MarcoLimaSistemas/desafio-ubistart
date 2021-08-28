import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { IUserRepository } from 'src/user/interfaces/IUserRepository';
import { UserRepository } from 'src/user/repositories/user.repository';

type PayloadType = {
  id: string;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UserRepository) private userRepository: IUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_KEY,
    });
  }
  async validate(payload: PayloadType): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }
}
