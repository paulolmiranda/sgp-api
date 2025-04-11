import { forwardRef, Module } from '@nestjs/common';
import { StoryNoteService } from './storynote.service';
import { StoryNoteController } from './storynote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryNote } from '../story-note.entity';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoryNote]),
    forwardRef(() => UserModule),
  ],
  controllers: [StoryNoteController],
  providers: [StoryNoteService],
  exports: [StoryNoteService],
})
export class StoryNoteModule {}
