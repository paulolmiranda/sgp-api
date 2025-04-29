import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Epic } from './epic.entity';

@Injectable()
export class EpicRepository extends Repository<Epic> {
  constructor(dataSource: DataSource) {
    super(Epic, dataSource.createEntityManager());
  }

  findByUser(userId: string): Promise<Epic[]> {
    return this.find({
      where: { createdUser: { id: userId } },
    });
  }

  findByProject(projectId: string): Promise<Epic[]> {
    return this.find({
      where: { project: { id: projectId } },
    });
  }
}
