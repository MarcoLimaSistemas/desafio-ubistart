import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { DateTime } from 'luxon';
import { Status, Todo } from '../todo.entity';

@EventSubscriber()
export class TodoSubscriber implements EntitySubscriberInterface<Todo> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return Todo;
  }
  afterLoad(todo: any) {
    //Se o TODO está atrasado, então a aplicação deve retornar que o TODO está atrasado
    const now = Number(DateTime.now().toFormat('yyyyMMdd'));
    const dateDeadLine = Number(
      DateTime.fromSQL(todo.deadline).toFormat('yyyyMMdd'),
    );
    if (Status.PENDING == todo.status && dateDeadLine < now) {
      todo.status_deadline = 'ATRAZADA';
    } else {
      todo.status_deadline = 'NO PRAZO';
    }
  }
}
