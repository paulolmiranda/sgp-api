import { Injectable, NotFoundException } from '@nestjs/common';
import { DefaultResponse } from 'src/commons/default-response';
import { validate } from 'class-validator';
import { Epic } from './epic.entity';
import { CreateEpicDto } from './dtos/create-epic.dto';
import { UpdateEpicDto } from './dtos/update-epic.dto';
import { EpicDto } from './dtos/epic.dto';
import { User } from 'src/user/user.entity';
import { EpicRepository } from './epic.repository';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class EpicService {
  constructor(
    private readonly epicRepository: EpicRepository,
    private readonly projectService: ProjectService,
  ) {}

  public async create(dto: CreateEpicDto, userId: string): Promise<DefaultResponse> {
    await validate(dto);
    const project = await this.projectService.getById(dto.projectId);
    if (!project) throw new NotFoundException('Projeto não encontrado');

    const epic = Epic.newInstance({
      description: dto.description,
      project,
      createdUser: User.newInstance({ id: userId }),
      createdAt: new Date(),
    });

    const saved = await this.epicRepository.save(epic);
    return { id: saved.id };
  }

  public async update(
    id: string,
    dto: UpdateEpicDto,
    userId: string,
  ): Promise<DefaultResponse> {
    await validate(dto);
    const epic = await this.epicRepository.findOne({
      where: { id },
      relations: ['project', 'createdUser', 'project.createdUser'],
    });
    if (
      !epic ||
      (epic.project.createdUser.id !== userId && epic.createdUser.id !== userId)
    ) {
      throw new NotFoundException('Épico não encontrado ou não autorizado');
    }

    epic.description = dto.description;
    epic.updatedAt = new Date();
    epic.updateUser = User.newInstance({ id: userId });

    const updated = await this.epicRepository.save(epic);
    return { id: updated.id };
  }

  public async list(userId: string): Promise<EpicDto[]> {
    const epics = await this.epicRepository.findByUser(userId);
    return epics.map(EpicDto.fromEntity);
  }

  public async listByProject(projectId: string): Promise<EpicDto[]> {
    await this.projectService.getById(projectId);
    const epics = await this.epicRepository.findByProject(projectId);
    return epics.map(EpicDto.fromEntity);
  }

  public async remove(id: string, userId: string): Promise<void> {
    const epic = await this.epicRepository.findOne({
      where: { id },
      relations: ['project', 'createdUser', 'project.createdUser'],
    });
    if (
      !epic ||
      (epic.project.createdUser.id !== userId && epic.createdUser.id !== userId)
    ) {
      throw new NotFoundException('Épico não encontrado ou não autorizado');
    }
    await this.epicRepository.remove(epic);
  }
}
