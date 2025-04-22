import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Team } from './team.entity';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamService, TeamRepository],
})
export class TeamModule {}
