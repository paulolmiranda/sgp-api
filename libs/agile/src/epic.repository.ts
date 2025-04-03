import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Epic } from './epic.entity';

@Injectable()
export class EpicRepository extends Repository<Epic> {
  constructor(private dataSource: DataSource) {
    super(Epic, dataSource.createEntityManager());
  }

  // Método para encontrar todos os épicos relacionados a um usuário

  async findEpicsByUser(userId: string): Promise<Epic[]> {
    return this.createQueryBuilder('epic')
      .leftJoinAndSelect('epic.createdUser', 'createdUser')
      .where('createdUser.id = :userId', { userId })
      .leftJoinAndSelect('epic.project', 'project')
      .leftJoinAndSelect('epic.updateUser', 'updateUser')
      .leftJoinAndSelect('epic.features', 'features')
      .leftJoinAndSelect('epic.stories', 'stories')
      .getMany();
  }

  // Método para encontrar todos os épicos relacionados a um projeto

  async findEpicsByProject(projectId: string): Promise<Epic[]> {
    return this.createQueryBuilder('epic')
      .leftJoinAndSelect('epic.project', 'project')
      .where('project.id = :projectId', { projectId })
      .leftJoinAndSelect('epic.createdUser', 'createdUser')
      .leftJoinAndSelect('epic.updateUser', 'updateUser')
      .leftJoinAndSelect('epic.features', 'features')
      .leftJoinAndSelect('epic.stories', 'stories')
      .getMany();
  }
}
