import { BadRequestException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InsertTodoDto } from '../dto/insert-todo.dto';
import { Todo } from '../entities/todo.entity';
import ITodoRepository from '../interfaces/ITodoRepository';

@EntityRepository(Todo)
export default class TodoRepository
  extends Repository<Todo>
  implements ITodoRepository
{
  async insertTodo(
    insertTodoDto: InsertTodoDto,
    user: User,
  ): Promise<Todo | Error> {
    const todo = new Todo();
    todo.user = user;
    Object.assign<Todo, InsertTodoDto>(todo, insertTodoDto);
    try {
      await todo.save();
      delete todo.user;
      return todo;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error ao cadastrar usuário.');
    }
  }
}
