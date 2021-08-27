import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Informe seu nome.',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe um endereço de E-mail.',
  })
  @IsEmail(
    {},
    {
      message: 'Insira um e-mail válido.',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Informe sua senha.',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  })
  password: string;

  passwordConfirmation?: string;
}
