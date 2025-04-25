import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { DefaultResponse } from 'src/commons/default-response';

import { Epic }           from './epic.entity';
import { CreateEpicDto }  from './dtos/create-epic.dto';
import { UpdateEpicDto }  from './dtos/update-epic.dto';
import { EpicDto }        from './dtos/epic.dto';

import { User }           from 'src/user/user.entity';
import { EpicRepository } from './epic.repository';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class EpicService {
  constructor(
    private readonly epicRepo: EpicRepository,
    private readonly projectSvc: ProjectService,
  ) {}

  public async create(dto: CreateEpicDto, userId: string): Promise<DefaultResponse> {
    await validate(dto);
    const project = await this.projectSvc.getById(dto.projectId);
    if (!project) throw new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND);

    const epic = Epic.newInstance({
      description: dto.description,
      project,
      createdUser: User.newInstance({ id: userId }),
      createdAt: new Date(),
    });

    const saved = await this.epicRepo.save(epic);
    return { id: saved.id };
  }

  public async update(
    id: string,
    dto: UpdateEpicDto,
    userId: string,
  ): Promise<DefaultResponse> {
    await validate(dto);
    const epic = await this.epicRepo.findOne({
      where: { id },
      relations: ['project', 'createdUser', 'project.createdUser'],
    });
    if (
      !epic ||
      (epic.project.createdUser.id !== userId && epic.createdUser.id !== userId)
    ) {
      throw new HttpException('Épico não encontrado ou não autorizado', HttpStatus.NOT_FOUND);
    }

    epic.description = dto.description;
    epic.updatedAt   = new Date();
    epic.updateUser  = User.newInstance({ id: userId });

    const updated = await this.epicRepo.save(epic);
    return { id: updated.id };
  }

  public async list(userId: string): Promise<EpicDto[]> {
    const epics = await this.epicRepo.findByUser(userId);
    return epics.map(EpicDto.fromEntity);
  }

  public async listByProject(projectId: string): Promise<EpicDto[]> {
    const project = await this.projectSvc.getById(projectId);
    if (!project) throw new HttpException('Projeto não encontrado', HttpStatus.NOT_FOUND);

    const epics = await this.epicRepo.findByProject(projectId);
    return epics.map(EpicDto.fromEntity);
  }

  public async remove(id: string, userId: string): Promise<void> {
    const epic = await this.epicRepo.findOne({
      where: { id },
      relations: ['project', 'createdUser', 'project.createdUser'],
    });
    if (
      !epic ||
      (epic.project.createdUser.id !== userId && epic.createdUser.id !== userId)
    ) {
      throw new HttpException('Épico não encontrado ou não autorizado', HttpStatus.NOT_FOUND);
    }

    await this.epicRepo.softRemove(epic);
  }
}
