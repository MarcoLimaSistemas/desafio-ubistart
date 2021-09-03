import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { ROLE } from 'src/user/dto/role-enum';
import { User } from 'src/user/entities/user.entity';
import { EntityNotFoundError, FindOneOptions } from 'typeorm';
import { InsertTodoDto } from './dto/insert-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Status, Todo } from './entities/todo.entity';
import ITodoRepository from './interfaces/ITodoRepository';
import { ITodoService } from './interfaces/ITodoService';
import TodoRepository from './repositories/todo-repository';

@Injectable()
export class TodoService extends ITodoService {

  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: ITodoRepository,
  ) {
    super();
  }
  async insertTodo(
    insertTodoDto: InsertTodoDto,
    user: User,
  ): Promise<Todo | Error> {
    return await this.todoRepository.insertTodo(insertTodoDto, user);
  }
  async listTodos(
    query: PaginateQuery,
    user: User,
    filter: string,
  ): Promise<Paginated<Todo>> {
    switch (user.role) {
      case ROLE.ADMIN:
        return await this.todoRepository.listFromAdmin(query, filter);
      case ROLE.USER:
        return await this.todoRepository.listFromUser(query, user);
      default:
        throw new Error('Função não implementada para user.role fornecida');
    }
  }
  
  async updateTodo(
    todo: Todo,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> { 
    if (todo.status == Status.FINISHED) {
      throw new ConflictException('Não é possivel atualizar um todo finalizado');
    }
    Object.assign(todo, updateTodoDto);  
    try {
      await todo.save();
      return todo;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error ao atualizar a tarefa.');
    }
  }
  async findOneByIdOrFail(options?: FindOneOptions<Todo>): Promise<Todo> {
    return await this.todoRepository.findOneOrFail(options);
  }
}
