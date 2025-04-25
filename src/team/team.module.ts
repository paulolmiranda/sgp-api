import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Team } from './team.entity';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';
import { TeamController } from './team.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), ProjectModule],
  providers: [TeamService, TeamRepository],
  controllers: [TeamController],
})
export class TeamModule {}
