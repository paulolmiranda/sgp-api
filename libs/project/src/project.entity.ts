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
import { BaseEntity } from '@app/commons';

import { Team } from './team.entity';
import { Swimlane } from './swimlane.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  title: string;

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

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'created_user_id',
    foreignKeyConstraintName: 'projects_01_fk',
  })
  createdUser: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({
    name: 'update_user_id',
    foreignKeyConstraintName: 'projects_02_fk',
  })
  updateUser: User;

  @OneToMany(() => Team, (team) => team.project, { cascade: ['insert'] })
  teams: Team[];

  @OneToMany(() => Swimlane, (swimlane) => swimlane.project, {
    cascade: ['insert'],
  })
  swimlanes: Swimlane[];
}
