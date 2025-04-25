import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Story } from './story.entity';
import { StoryService } from './story.service';
import { StoryRepository } from './story.repository';
import { StoryController } from './story.controller';
import { ProjectModule } from 'src/project/project.module';


@Module({
  imports: [ProjectModule, TypeOrmModule.forFeature([Story])],
  providers: [StoryService, StoryRepository],
  controllers: [StoryController],
})
export class StoryModule {}
