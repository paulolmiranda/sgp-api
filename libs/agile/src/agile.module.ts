import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Epic } from './epic.entity';
import { Story } from './story.entity';
import { Feature } from './feature.entity';
import { StoryTask } from './story-task.entity';
import { StoryNote } from './story-note.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story, StoryTask, StoryNote, Epic, Feature]),
  ],
  providers: [],
  exports: [],
})
export class AgileModule {}
