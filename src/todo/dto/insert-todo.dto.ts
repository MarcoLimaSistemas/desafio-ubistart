import { IsNotEmpty, Matches } from 'class-validator';

export class InsertTodoDto {
  @IsNotEmpty({
    message: 'Informe um nome para tarefa.',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe um prazo para tarefa',
  })
  @Matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, {
    message: 'Data inválida (YYYY-MM-DD)',
  })
  deadline: Date;
}
