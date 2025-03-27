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

import { User } from '@app/user';
import { BaseEntity } from '@app/commons';

import { Story } from './story.entity';

@Entity('storys_notes')
export class StoryNote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

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

  @ManyToOne(() => Story, (story) => story.notes)
  @JoinColumn({
    name: 'story_id',
    foreignKeyConstraintName: 'storys_notes_01_fk',
  })
  story: Story;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'created_user_id',
    foreignKeyConstraintName: 'storys_notes_02_fk',
  })
  createdUser: User;
}
