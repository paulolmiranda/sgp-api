import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Swimlane } from './swimlane.entity';
import { SwimlaneService } from './swimlane.service';
import { SwimlaneRepository } from './swimlane.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Swimlane])],
  providers: [SwimlaneService, SwimlaneRepository],
})
export class SwimlaneModule {}
