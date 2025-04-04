import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@app/user';
import { DefaultResponse, validate } from '@app/commons';

import { Team } from './team.entity';
import { Project } from './project.entity';
import { Swimlane } from './swimlane.entity';
import { ProjectRepository } from './project.repository';
import { ProjectCreateDto } from './dtos/project-create.dto';
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



  async getById(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['createdUser', 'teams', 'swimlanes'],
    });
    return project;
  }

  async updateProject(id: string, updateProjectDto: ProjectUpdateDto, userId: string) {
    // Busca o projeto pelo ID incluindo o relacionamento createdUser
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['createdUser'],
    });
    // Comparar o ID do usuário autenticado com o ID do criador do projeto
    if (project.createdUser.id !== userId)

      Object.assign(project, updateProjectDto);// Se passar na validação, atualiza o projeto
    return this.projectRepository.save(project);
  }



  async listProjects(userId: string): Promise<Project[]> {
    console.log('Filtrando projetos para o usuário:', userId);
    // Busca os projetos onde o usuário autenticado é o criador
    const projects = await this.projectRepository.find({
      where: { createdUser: { id: userId } },
      relations: ['createdUser'],
    });
    return projects;
  }


  //softdelete
  async deleteProject(id: string, userId: string): Promise<any> {
    // Busca o projeto pelo ID incluindo o relacionamento 'createdUser'
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['createdUser'],
    });
    // Verifica se o usuário autenticado é o criador do projeto
    if (project.createdUser.id !== userId)
      await this.projectRepository.softDelete(id);
  }
}
