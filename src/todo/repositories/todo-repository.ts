import { BadRequestException } from '@nestjs/common';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from 'src/user/entities/user.entity';
import { EntityNotFoundError, EntityRepository, FindOneOptions, Repository } from 'typeorm';
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

  async listFromUser(
    query: PaginateQuery,
    user: User,
  ): Promise<Paginated<Todo>> {
    return paginate(query, this, {
      sortableColumns: ['id', 'name'],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
      where: {
        //Eu quero listar apenas os MEUS itens
        user: { id: user.id },
      },
    });
  }
  //Como um administrador eu quero listar todos os itens de TODO, assim poderei ver todas as tarefas criadas
  // * A lista deve ser paginada
  async listFromAdmin(
    query: PaginateQuery,
    filter?: string,
  ): Promise<Paginated<Todo>> {
    const todosPaginated = await paginate(
      query,
      this.createQueryBuilder('todos')
        .leftJoinAndSelect('todos.user', 'user')
        .select([
          'todos.id',
          'todos.name',
          'todos.deadline',
          'todos.status',
          'user.email',
        ]),
      {
        sortableColumns: ['id', 'name'],
        searchableColumns: ['name'],
        defaultSortBy: [['id', 'DESC']],
      },
    );
    if (filter)
      todosPaginated.data = todosPaginated.data.filter(
        (todo) => todo.status_deadline == filter,
      );
    return todosPaginated;
  }

  async findOneByIdOrFail(options?: FindOneOptions<Todo>): Promise<Todo> {
     return await this.findOneOrFail(options);
  }
}
