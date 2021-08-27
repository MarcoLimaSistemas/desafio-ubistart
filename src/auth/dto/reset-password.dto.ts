import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({
    message: 'Informe um endereço de E-mail.',
  })
  @IsEmail({})
  email: string;

  @IsNotEmpty({
    message: 'Informe sua senha.',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  })
  password: string;
}
