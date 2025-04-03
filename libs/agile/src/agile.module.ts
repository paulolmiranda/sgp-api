import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Epic } from './epic.entity';
import { Story } from './story.entity';
import { Feature } from './feature.entity';
import { StoryTask } from './story-task.entity';
import { StoryNote } from './story-note.entity';
import { EpicController } from 'src/controllers/epic.controller';
import { EpicService } from './epic.service';
import { ProjectModule } from '@app/project';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story, StoryTask, StoryNote, Epic, Feature]),
    ProjectModule
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AgileModule {}
