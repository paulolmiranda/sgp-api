import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Epic } from './epic.entity';

@Injectable()
export class EpicRepository extends Repository<Epic> {
  constructor(private dataSource: DataSource) {
    super(Epic, dataSource.createEntityManager());
  }

  async findByUser(userId: string): Promise<Epic[]> {
    return this.find({
      where: { createdUser: { id: userId } },
      relations: ['project', 'createdUser', 'updateUser', 'features', 'stories'],
    });
  }

  async findByProject(projectId: string): Promise<Epic[]> {
    return this.find({
      where: { project: { id: projectId } },
      relations: ['project', 'createdUser', 'updateUser', 'features', 'stories'],
    });
  }
}
