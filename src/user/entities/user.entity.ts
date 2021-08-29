import * as bcrypt from 'bcrypt';
import { Todo } from 'src/todo/entities/todo.entity';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ROLE } from '../dto/role-enum';

@Entity({
  name: 'users',
})
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 200,
  })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: ROLE;

  @Column({ nullable: false, type: 'varchar', length: 200, select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password || this.password, 12);
  }

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, 12);
    return hash === this.password;
  }
}
