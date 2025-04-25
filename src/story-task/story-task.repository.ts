import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { StoryTask } from './story-task.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class StoryTaskRepository extends BaseRepository<StoryTask> {
  constructor(dataSource: DataSource) {
    super(StoryTask, dataSource.createEntityManager());
  }
}
