import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@app/user';
import { BaseEntity } from '@app/commons';

import { Project } from './project.entity';

@Entity('swimlanes')
export class Swimlane extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Project)
  @JoinColumn({
    name: 'project_id',
    foreignKeyConstraintName: 'swimlanes_01_fk',
  })
  project: Project;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'created_user_id',
    foreignKeyConstraintName: 'swimlanes_02_fk',
  })
  createdUser: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({
    name: 'update_user_id',
    foreignKeyConstraintName: 'swimlanes_03_fk',
  })
  updateUser: User;
}
