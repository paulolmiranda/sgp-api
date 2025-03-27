import { Injectable } from '@nestjs/common';

import { User } from '@app/user';
import { DefaultResponse, validate } from '@app/commons';

import { Team } from './team.entity';
import { Project } from './project.entity';
import { Swimlane } from './swimlane.entity';
import { ProjectRepository } from './project.repository';
import { ProjectCreateDto } from './dtos/project-create.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  public async create(
    projectDto: ProjectCreateDto,
    userId: string,
  ): Promise<DefaultResponse> {
    await validate(projectDto);

    const project = Project.newInstance({
      createdAt: new Date(),
      title: projectDto.title,
      description: projectDto.description,
      createdUser: User.newInstance({ id: userId }),
    });

    project.swimlanes = [
      Swimlane.newInstance({
        order: 1,
        project,
        description: 'Backlog',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: userId }),
      }),
      Swimlane.newInstance({
        order: 2,
        project,
        description: 'To Do',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: userId }),
      }),
      Swimlane.newInstance({
        order: 3,
        project,
        description: 'In Progress',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: userId }),
      }),
      Swimlane.newInstance({
        order: 4,
        project,
        description: 'Review/Testes',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: userId }),
      }),
      Swimlane.newInstance({
        order: 5,
        project,
        description: 'Done',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: userId }),
      }),
    ];

    project.teams = [
      Team.newInstance({
        project,
        createdAt: new Date(),
        user: User.newInstance({ id: userId }),
        createdUser: User.newInstance({ id: userId }),
      }),
    ];

    const data = await this.projectRepository.save(project);

    return {
      id: data.id,
    };
  }

  public async getById(id: string): Promise<Project> {
    return this.projectRepository.findOne({
      where: { id },
    });
  }
}
