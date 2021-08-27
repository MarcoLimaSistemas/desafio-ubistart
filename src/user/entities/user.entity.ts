import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
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

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(password || this.password, salt);
  }

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, 12);
    return hash === this.password;
  }
}
