import { StoryTask } from '@app/agile';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryTaskRepository } from './story-task.repository';
import { StoryTaskService } from './storytask.service';
import { StoryTaskController } from '../../../../src/controllers/storytask.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StoryTask])],
  providers: [StoryTaskRepository, StoryTaskService],
  exports: [],
  controllers: [StoryTaskController],
})
export class StorytaskModule {}
