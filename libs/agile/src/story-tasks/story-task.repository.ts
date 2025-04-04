import { StoryTask } from './../story-task.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@app/commons';

@Injectable()
export class StoryTaskRepository extends BaseRepository<StoryTask> {
  constructor(dataSource: DataSource) {
    super(StoryTask, dataSource.createEntityManager());
  }
}
