import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  PENDING,
  FINISHED,
}

@Entity({
  name: 'todos',
})
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'date' })
  deadline: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  status_deadline?: string;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
