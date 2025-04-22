import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Story } from './story.entity';
import { StoryService } from './story.service';
import { StoryRepository } from './story.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Story])],
  providers: [StoryService, StoryRepository],
})
export class StoryModule {}
