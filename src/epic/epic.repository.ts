import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Epic } from './epic.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class EpicRepository extends BaseRepository<Epic> {
  constructor(dataSource: DataSource) {
    super(Epic, dataSource.createEntityManager());
  }
}
