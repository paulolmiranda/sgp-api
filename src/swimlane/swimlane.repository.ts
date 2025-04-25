import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Swimlane } from './swimlane.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class SwimlaneRepository extends BaseRepository<Swimlane> {
  constructor(dataSource: DataSource) {
    super(Swimlane, dataSource.createEntityManager());
  }
}
