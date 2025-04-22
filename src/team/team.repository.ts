import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Team } from './team.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class TeamRepository extends BaseRepository<Team> {
  constructor(dataSource: DataSource) {
    super(Team, dataSource.createEntityManager());
  }
}
