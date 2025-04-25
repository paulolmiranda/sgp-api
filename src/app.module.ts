import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import ormOptions from 'typeorm.config';
import { AppController } from './app.controller';

import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EpicModule } from './epic/epic.module';
import { StoryModule } from './story/story.module';
import { EmailModule } from './email/email.module';
import { FeatureModule } from './feature/feature.module';
import { ProjectModule } from './project/project.module';
import { SwimlaneModule } from './swimlane/swimlane.module';
import { StoryTaskModule } from './story-task/story-task.module';
import { StoryNoteModule } from './story-note/story-note.module';
import { ExceptionFilter } from './commons/exception/exception.filter';

@Module({
  imports: [
    TeamModule,
    UserModule,
    AuthModule,
    EpicModule,
    EmailModule,
    StoryModule,
    ProjectModule,
    FeatureModule,
    SwimlaneModule,
    StoryTaskModule,
    StoryNoteModule,
    TypeOrmModule.forRoot(ormOptions),
    EventEmitterModule.forRoot({
      global: true,
      delimiter: '.',
      maxListeners: 5,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
