import { Injectable } from '@nestjs/common';

import { Project } from './project.entity';
import { User } from 'src/user/user.entity';
import { Team } from 'src/team/team.entity';
import { Swimlane } from 'src/swimlane/swimlane.entity';
import { ProjectRepository } from './project.repository';
import { ProjectCreateDto } from './dtos/project-create.dto';
import { DefaultResponse } from 'src/commons/default-response';
import { validate } from 'src/commons/exception/exception-commons';

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

  //Alterado para que eu pudesse trazer o criador do projeto junto.
  public getById(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['createdUser'],
    });
  }

  public async isOwner(id: string, userId: string): Promise<boolean> {
    const count = await this.projectRepository.count({
      where: { id, createdUser: { id: userId } },
    });

    return count !== 0;
  }

  public async isMember(id: string, userId: string): Promise<boolean> {
    const count = await this.projectRepository.count({
      where: { id, teams: { user: { id: userId } } },
    });

    return count !== 0;
  }
}
