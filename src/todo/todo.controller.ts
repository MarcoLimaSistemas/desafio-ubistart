import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { GetUser } from 'src/auth/decoretors/get-user.decoretor';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/user/entities/user.entity';
import { InsertTodoDto } from './dto/insert-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { TodoService } from './todo.service';
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post('/')
  @UseGuards(AuthGuard(), RolesGuard)
  async insertTodo(
    @Body(ValidationPipe) insertTodoDto: InsertTodoDto,
    @GetUser() user: User,
  ) {
    return await this.todoService.insertTodo(insertTodoDto, user);
  }
  @Get('/')
  @UseGuards(AuthGuard(), RolesGuard)
  async listTodos(
    @Query('filter') filter: string,
    @Paginate() query: PaginateQuery,
    @GetUser() user: User,
  ) {
    const paginatedTodos = await this.todoService.listTodos(
      query,
      user,
      filter,
    );
    return paginatedTodos;
  }
  //Como um usuário eu quero editar um TODO, então poderei atualizar minha lista
  @Put('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  async updateTodo(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.updateTodo(id, updateTodoDto);
  }
}
