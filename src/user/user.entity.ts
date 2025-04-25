import { Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from 'src/commons/base-entity';

export enum UserStatus {
  ACTIVE = 'A',
  INACTIVE = 'I',
  PENDING = 'P',
}

@Entity('users')
export class User extends BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  public id: string;

  @Column('character varying', { name: 'name', length: 250 })
  public name: string;

  @Column('character varying', { name: 'email', length: 50 })
  public email: string;

  @Column('character varying', { name: 'password', length: 250 })
  public password: string;

  @Column('uuid', { name: 'recovery_code' })
  public recoveryCode: string | null;

  @Column('uuid', { name: 'activation_code' })
  public activationCode: string | null;

  @Column({
    type: 'enum',
    name: 'status',
    nullable: false,
    enum: UserStatus,
  })
  public status: UserStatus;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()',
    type: 'timestamp without time zone',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at',
    type: 'timestamp without time zone',
  })
  public updatedAt: Date | null;
}
