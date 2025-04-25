import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { StoryTask } from './story-task.entity';
import { StoryTaskService } from './story-task.service';
import { StoryTaskRepository } from './story-task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoryTask])],
  providers: [StoryTaskService, StoryTaskRepository],
})
export class StoryTaskModule {}
