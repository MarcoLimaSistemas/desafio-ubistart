import { IsEmail, IsNotEmpty } from 'class-validator';
export class CredentialsDto {
  @IsNotEmpty({
    message: 'Informe um endereço de E-mail.',
  })
  @IsEmail({})
  email: string;

  @IsNotEmpty({
    message: 'Informe sua senha',
  })
  password: string;
}
