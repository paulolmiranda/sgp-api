import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from './user.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
