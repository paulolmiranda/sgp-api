import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Team } from './team.entity';
import { Project } from './project.entity';
import { Swimlane } from './swimlane.entity';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Team, Swimlane])],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
