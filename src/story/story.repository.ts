import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Story } from './story.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class StoryRepository extends BaseRepository<Story> {
  findById(storyId: string) {
    throw new Error('Method not implemented.');
  }
  isMember(storyId: string, id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(dataSource: DataSource) {
    super(Story, dataSource.createEntityManager());
  }
}
