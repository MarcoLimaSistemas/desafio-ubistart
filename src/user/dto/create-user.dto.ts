import { IsNotEmpty, IsEmail, MinLength, Validate } from 'class-validator';
import { Match } from 'src/utils/custom-validation/match.decorator';
import { IsUnique } from 'src/utils/custom-validation/validation-constraint';

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
  @IsUnique(
    { table: 'users', column: 'email' },
    { message: 'Email $value já existe' },
  )
  email: string;

  @IsNotEmpty({
    message: 'Informe sua senha.',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  })
  password: string;

  // Não encontrei na documentação algo que
  // simplificasse a confirmação de campos então utilzei uma solução encontrada no stackoverflow:
  // https://stackoverflow.com/questions/60451337/password-confirmation-in-typescript-with-class-validator
  @Match('password', {
    message: 'Senhas não conferem',
  })
  passwordConfirm: string;
}
