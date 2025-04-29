import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Swimlane } from './swimlane.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class SwimlaneRepository extends BaseRepository<Swimlane> {
  constructor(dataSource: DataSource) {
    super(Swimlane, dataSource.createEntityManager());
  }

  public async findAllByProject(projectId: string): Promise<Swimlane[]> {
    return this.find({
      where: {
        project: {
          id: projectId,
        },
      },
      order: {
        order: 'ASC',
      },
    });
  }
}
