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

import { User } from '@app/user';
import { Project } from '@app/project';
import { BaseEntity } from '@app/commons';

import { Story } from './story.entity';
import { Feature } from './feature.entity';

@Entity('epics')
export class Epic extends BaseEntity {
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
  @JoinColumn({ name: 'project_id', foreignKeyConstraintName: 'epics_01_fk' })
  project: Project;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'created_user_id',
    foreignKeyConstraintName: 'epics_02_fk',
  })
  createdUser: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({
    name: 'update_user_id',
    foreignKeyConstraintName: 'epics_03_fk',
  })
  updateUser: User;

  @OneToMany(() => Feature, (feature) => feature.epic)
  features: Feature[];

  @OneToMany(() => Story, (story) => story.epic)
  stories: Story[];
}
