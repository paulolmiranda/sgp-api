import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Team } from './team.entity';
import { Project } from './project.entity';
import { Swimlane } from './swimlane.entity';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Team, Swimlane])],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService, TypeOrmModule],
})
export class ProjectModule {}
