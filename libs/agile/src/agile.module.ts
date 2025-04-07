import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Epic } from './epic.entity';
import { Story } from './story.entity';
import { Feature } from './feature.entity';
import { StoryTask } from './story-task.entity';
import { StoryNote } from './story-note.entity';
import { FeatureController } from 'src/controllers/feature.controller';
import { FeatureService } from './feature.service';
import { FeatureRepository } from './feature.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story, StoryTask, StoryNote, Epic, Feature]),
  ],
  controllers: [FeatureController],
  providers: [FeatureService, FeatureRepository],
  exports: [FeatureService],
})
export class AgileModule {}
