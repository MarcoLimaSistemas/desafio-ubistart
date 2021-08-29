import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from 'src/user/entities/user.entity';
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
  async listTodos(query: PaginateQuery, user: User): Promise<Paginated<Todo>> {
    return paginate(query, this.todoRepository, {
      sortableColumns: ['id', 'name'],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
      where: {
        //Eu quero listar apenas os MEUS itens
        user: { id: user.id },
      },
    });
  }
  async updateTodo(
    idTodo: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id: idTodo } });
    if (!todo) {
      throw new NotFoundException('Tarefa não encontrada.');
    }
    if (todo.status == Status.FINISHED) {
      throw new BadRequestException(
        'Uma tarefa concluída não pode ser atualizada',
      );
    }
    Object.assign(todo, updateTodoDto);
    // TODO: Não consegui colocar em um hook, refatorar caso encontre a solução
    todo.status = Status[updateTodoDto.status];
    try {
      await todo.save();
      return todo;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error ao atualizar a tarefa.');
    }
  }
}
