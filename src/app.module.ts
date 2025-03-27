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

@Module({
  imports: [
    AuthModule,
    UserModule,
    AgileModule,
    EmailModule,
    ProjectModule,
    TypeOrmModule.forRoot(ormOptions),
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    ProjectController,
  ],
  providers: [],
})
export class AppModule {}
