import { PaginateQuery } from 'nestjs-paginate';
import { User } from 'src/user/entities/user.entity';
import { InsertTodoDto } from '../dto/insert-todo.dto';
import { Todo } from '../entities/todo.entity';

export abstract class ITodoService {
  abstract insertTodo(
    insertTodoDto: InsertTodoDto,
    user: User,
  ): Promise<Todo | Error>;
  abstract listTodos(
    query: PaginateQuery,
    user: User,
    filter: string,
  ): Promise<any>;
}
