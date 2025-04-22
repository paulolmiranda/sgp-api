import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { StoryNote } from './story-note.entity';
import { StoryNoteService } from './story-note.service';
import { StoryNoteRepository } from './story-note.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoryNote])],
  providers: [StoryNoteService, StoryNoteRepository],
})
export class StoryNoteModule {}
