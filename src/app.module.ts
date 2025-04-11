import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import ormOptions from 'typeorm.config';

import { AuthModule } from '@app/auth';
import { UserModule } from '@app/user';
import { AgileModule } from '@app/agile';
import { ProjectModule } from '@app/project';

import { EmailModule } from './email/email.module';
import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { ProjectController } from './controllers/project.controller';
import { UserAccessController } from './controllers/user-access.controller';


@Module({
  imports: [
    AuthModule,
    UserModule,
    AgileModule,
    EmailModule,
    ProjectModule,
    TypeOrmModule.forRoot(ormOptions),
    EventEmitterModule.forRoot({ global: true }),

  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    ProjectController,
    UserAccessController,
  ],
  providers: [],
})
export class AppModule { }
