import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

<<<<<<< HEAD:libs/agile/src/story-task.entity.ts
import { User } from '@app/user';
import { BaseEntity } from '@app/commons';

import { Story } from './story/story.entity';
=======
import { User } from 'src/user/user.entity';
import { Story } from 'src/story/story.entity';
import { BaseEntity } from 'src/commons/base-entity';
>>>>>>> main:src/story-task/story-task.entity.ts

@Entity('storys_tasks')
export class StoryTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Story, (story) => story.tasks)
  @JoinColumn({
    name: 'story_id',
    foreignKeyConstraintName: 'storys_tasks_01_fk',
  })
  story: Story;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'created_user_id',
    foreignKeyConstraintName: 'storys_tasks_02_fk',
  })
  createdUser: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({
    name: 'update_user_id',
    foreignKeyConstraintName: 'storys_tasks_03_fk',
  })
  updateUser: User;
}
