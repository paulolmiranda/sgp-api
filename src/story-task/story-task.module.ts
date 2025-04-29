import { StoryModule } from 'src/story/story.module';
import { UserModule } from 'src/user/user.module';
import { StoryTaskService } from './story-task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryTask } from './story-task.entity';
import { Module } from '@nestjs/common';
import { StoryTaskController } from './story-task.controller';
import { StoryTaskRepository } from './story-task.repository';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoryTask]),
    StoryModule,
    UserModule,
    ProjectModule,
  ],
  controllers: [StoryTaskController],
  providers: [StoryTaskService, StoryTaskRepository],
  exports: [StoryTaskService],
})
export class StoryTaskModule {}
