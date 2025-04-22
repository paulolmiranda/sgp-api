import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/user/user.entity';
import { Epic } from 'src/epic/epic.entity';
import { Story } from 'src/story/story.entity';
import { Project } from 'src/project/project.entity';
import { BaseEntity } from 'src/commons/base-entity';

@Entity('features')
export class Feature extends BaseEntity {
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

  @ManyToOne(() => Project)
  @JoinColumn({
    name: 'project_id',
    foreignKeyConstraintName: 'features_01_fk',
  })
  project: Project;

  @ManyToOne(() => Epic, (epic) => epic.features)
  @JoinColumn({
    name: 'epic_id',
    foreignKeyConstraintName: 'features_02_fk',
  })
  epic: Epic;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'created_user_id',
    foreignKeyConstraintName: 'features_03_fk',
  })
  createdUser: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({
    name: 'update_user_id',
    foreignKeyConstraintName: 'features_04_fk',
  })
  updateUser: User;

  @OneToMany(() => Story, (story) => story.feature)
  stories: Story[];
}
