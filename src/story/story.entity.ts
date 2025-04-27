import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Epic } from 'src/epic/epic.entity';
import { User } from 'src/user/user.entity';
import { BaseEntity } from 'src/commons/base-entity';
import { Project } from 'src/project/project.entity';
import { Feature } from 'src/feature/feature.entity';
import { StoryTask } from 'src/story-task/story-task.entity';
import { StoryNote } from 'src/story-note/story-note.entity';

@Entity('storys')
export class Story extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({ name: 'start_at', type: 'timestamp' })
  startAt: Date;

  @Column({ name: 'end_at', type: 'timestamp', nullable: true })
  endAt: Date;

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

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id', foreignKeyConstraintName: 'storys_01_fk' })
  project: Project;

  @ManyToOne(() => Feature, (feature) => feature.stories)
  @JoinColumn({ name: 'feature_id', foreignKeyConstraintName: 'storys_02_fk' })
  feature: Feature;

  @ManyToOne(() => Epic, (epic) => epic.stories)
  @JoinColumn({ name: 'epic_id', foreignKeyConstraintName: 'storys_03_fk' })
  epic: Epic;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'created_user_id',
    foreignKeyConstraintName: 'storys_04_fk',
  })
  createdUser: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({
    name: 'update_user_id',
    foreignKeyConstraintName: 'storys_05_fk',
  })
  updateUser: User;

  @OneToMany(() => StoryTask, (task) => task.story)
  tasks: StoryTask[];

  @OneToMany(() => StoryNote, (note) => note.story)
  notes: StoryNote[];
}
