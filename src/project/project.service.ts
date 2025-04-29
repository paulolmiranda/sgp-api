import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Project } from './project.entity';
import { User } from 'src/user/user.entity';
import { Team } from 'src/team/team.entity';
import { Swimlane } from 'src/swimlane/swimlane.entity';
import { ProjectRepository } from './project.repository';
import { ProjectCreateDto } from './dtos/project-create.dto';
import { DefaultResponse } from 'src/commons/default-response';
import { validate } from 'src/commons/exception/exception-commons';
import { ProjectUpdateDto } from './dtos/project-update.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) { }

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

  public async update(projectDto: ProjectUpdateDto): Promise<Project> {
    await validate(projectDto);

    const project = await this.projectRepository.findOne({
      where: { id: projectDto.id },
    });

    if (!project?.id) {
      throw new NotFoundException('Registro não encontrado.');
    }

    project.title = projectDto.title;
    project.description = projectDto.description;
    project.updatedAt = new Date();
    project.updateUser = User.newInstance({ id: projectDto.userId });

    return this.projectRepository.save(project);
  }

  public async getAll(userId: string): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      where: [
        { createdUser: { id: userId } },
        { teams: { user: { id: userId } } },
      ],
      relations: ['teams'],
    });

    return projects;
  }

  public async getById(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project?.id) {
      throw new NotFoundException('Registro não encontrado.');
    }
    return project;
  }

  public async delete(id: string, userId: string): Promise<void> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project?.id) {
      throw new NotFoundException('Registro não encontrado.');
    }

    await this.projectRepository.softRemove(project);

    project.deletedAt = new Date();
    await this.projectRepository.save(project);
  }
}
