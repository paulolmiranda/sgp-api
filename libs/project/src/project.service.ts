import { Injectable } from '@nestjs/common';

import { DefaultResponse, validate } from '@app/commons';

import { ProjectRepository } from './project.repository';
import { ProjectCreateDto } from './dtos/project-create.dto';
import { Project } from './project.entity';
import { User } from '@app/user';
import { Team } from './team.entity';
import { Swimlane } from './swimlane.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  public async create(projectDto: ProjectCreateDto): Promise<DefaultResponse> {
    await validate(projectDto);

    const project = Project.newInstance({
      createdAt: new Date(),
      title: projectDto.title,
      description: projectDto.description,
      createdUser: User.newInstance({ id: projectDto.userId }),
    });

    project.swimlanes = [
      Swimlane.newInstance({
        project,
        description: 'Backlog',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: projectDto.userId }),
      }),
      Swimlane.newInstance({
        project,
        description: 'To Do',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: projectDto.userId }),
      }),
      Swimlane.newInstance({
        project,
        description: 'In Progress',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: projectDto.userId }),
      }),
      Swimlane.newInstance({
        project,
        description: 'Review/Testes',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: projectDto.userId }),
      }),
      Swimlane.newInstance({
        project,
        description: 'Done',
        createdAt: new Date(),
        createdUser: User.newInstance({ id: projectDto.userId }),
      }),
    ];

    project.teams = [
      Team.newInstance({
        project,
        createdAt: new Date(),
        user: User.newInstance({ id: projectDto.userId }),
        createdUser: User.newInstance({ id: projectDto.userId }),
      }),
    ];

    const data = await this.projectRepository.save(project);

    return {
      id: data.id,
    };
  }
}
