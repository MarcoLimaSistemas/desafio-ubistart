import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repositories/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IAuthService } from './interfaces/IAuthService';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_KEY,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [{ provide: IAuthService, useClass: AuthService }, JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule,
    { provide: IAuthService, useClass: AuthService },
  ],
})
export class AuthModule {}
