import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { StoryNote } from './story-note.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class StoryNoteRepository extends BaseRepository<StoryNote> {
  constructor(dataSource: DataSource) {
    super(StoryNote, dataSource.createEntityManager());
  }
}
