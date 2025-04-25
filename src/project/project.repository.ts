import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Project } from './project.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }
}
