import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InsertTodoDto } from '../dto/insert-todo.dto';
import { Todo } from '../entities/todo.entity';

export default abstract class ITodoRepository extends Repository<Todo> {
  abstract insertTodo(
    insertTodoDto: InsertTodoDto,
    user: User,
  ): Promise<Todo | Error>;
}
