import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epic } from './epic.entity';
import { Story } from './story.entity';
import { Feature } from './feature.entity';
import { StoryTask } from './story-task.entity';
import { StoryNote } from './story-note.entity';
import { EpicController } from '../../../src/controllers/epic.controller';
import { EpicService } from './epic.service';
import { Project, ProjectModule } from '@app/project';
import { EpicRepository } from './epic.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story, StoryTask, StoryNote, Epic, Feature,Project]),
    ProjectModule
  ],
  providers: [EpicService,{
    provide: EpicRepository,
    useFactory: (dataSource: DataSource) => new EpicRepository(dataSource),
    inject: [DataSource],
  },],
  controllers: [EpicController],
  exports: [EpicService],
})
export class AgileModule {}
