import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Epic } from './epic.entity';
import { Story } from './story/story.entity';
import { Feature } from './feature.entity';
import { StoryTask } from './story-task.entity';
import { StoryNote } from './story-note.entity';
import { StoryService } from './story/story.service';
import { StoryRepository } from './story/story.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story, StoryTask, StoryNote, Epic, Feature]),
  ],
  providers: [StoryService, StoryRepository],
  exports: [StoryService],
})
export class AgileModule {}
