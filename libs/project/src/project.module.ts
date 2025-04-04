import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Team } from './team.entity';
import { Project } from './project.entity';
import { Swimlane } from './swimlane.entity';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { SwimlaneService } from './swimlane.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Team, Swimlane])],
  providers: [ProjectService, ProjectRepository, SwimlaneService],
  exports: [ProjectService, SwimlaneService],
})
export class ProjectModule {}
