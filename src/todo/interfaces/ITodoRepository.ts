import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { User } from 'src/user/entities/user.entity';
import { EntityNotFoundError, FindOneOptions, Repository } from 'typeorm';
import { InsertTodoDto } from '../dto/insert-todo.dto';
import { Todo } from '../entities/todo.entity';

export default abstract class ITodoRepository extends Repository<Todo> {
  abstract insertTodo(
    insertTodoDto: InsertTodoDto,
    user: User,
  ): Promise<Todo | Error>;

  abstract listFromUser(
    query: PaginateQuery,
    user: User,
  ): Promise<Paginated<Todo>>;
  abstract listFromAdmin(
    query: PaginateQuery,
    filter: string,
  ): Promise<Paginated<Todo>>;

  abstract findOneByIdOrFail(options?: FindOneOptions<Todo>): Promise<Todo> 
  
}
