import { IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { Status } from '../entities/todo.entity';

export class UpdateTodoDto {
  @IsNotEmpty({
    message: 'Informe um nome para tarefa.',
  })
  @IsOptional()
  name: string;

  @IsNotEmpty({
    message: 'Informe um prazo para tarefa',
  })
  @IsOptional()
  @Matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, {
    message: 'Data inválida (YYYY-MM-DD)',
  })
  deadline: Date;

  @IsOptional()
  @IsEnum(Status, { message: 'Status inválido' })
  status: string;
}
