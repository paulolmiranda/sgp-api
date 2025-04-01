import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Story } from './story.entity';
import { BaseRepository } from '@app/commons';

@Injectable()
export class StoryRepository extends BaseRepository<Story> {
  constructor(dataSource: DataSource) {
    super(Story, dataSource.createEntityManager());
  }
}
