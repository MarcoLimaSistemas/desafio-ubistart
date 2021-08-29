import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoSubscriber } from './entities/entity-listener/todo.entity.listener';
import TodoRepository from './repositories/todo-repository';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoSubscriber],
  exports: [TodoService],
})
export class TodoModule {}
