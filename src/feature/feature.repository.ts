import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Feature } from './feature.entity';
@Injectable()
export class FeatureRepository extends Repository<Feature> {
  constructor(dataSource: DataSource) {
    super(Feature, dataSource.createEntityManager());
  }
  findByUser(userId: string): Promise<Feature[]> {
    return this.find({
      where: { createdUser: { id: userId } },
      relations: ['project', 'epic'],
      order: { createdAt: 'DESC' },
    });
  }
  findByProject(projectId: string): Promise<Feature[]> {
    return this.find({
      where: { project: { id: projectId } },
      relations: ['epic', 'createdUser'],
      order: { createdAt: 'DESC' },
    });
  }
}
