import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StoryNote } from '../story-note.entity';

@Injectable()
export class StoryNoteRepository extends Repository<StoryNote> {
  constructor(private dataSource: DataSource) {
    super(StoryNote, dataSource.createEntityManager());
  }

  async findByUserId(userId: string): Promise<StoryNote[]> {
    return this.find({
      where: {
        createdUser: { id: userId },
      },
      relations: ['createdUser'],
    });
  }
}
