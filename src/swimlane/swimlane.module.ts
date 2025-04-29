import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Swimlane } from './swimlane.entity';
import { SwimlaneService } from './swimlane.service';
import { SwimlaneRepository } from './swimlane.repository';
import { SwimlaneController } from './swimlane.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Swimlane]), ProjectModule],
  providers: [SwimlaneService, SwimlaneRepository],
  controllers: [SwimlaneController],
  exports: [SwimlaneService],
})
export class SwimlaneModule {}
