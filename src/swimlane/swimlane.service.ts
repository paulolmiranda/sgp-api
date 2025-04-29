import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SwimlaneRepository } from './swimlane.repository';
import { SwimlaneCreateDto } from './dtos/swimlane.create.dto';
import { ProjectService } from 'src/project/project.service';
import { User } from 'src/user/user.entity';
import { Swimlane } from './swimlane.entity';
import { DefaultResponse } from 'src/commons/default-response';
import { validate } from 'src/commons/exception/exception-commons';
import { SwimlaneUpdateDto } from './dtos/swimlane.update.dto';

@Injectable()
export class SwimlaneService {
  constructor(
    private readonly swimlaneRepository: SwimlaneRepository,
    private readonly projectService: ProjectService,
  ) {}

  public async create(
    dto: SwimlaneCreateDto,
    projectId: string,
    userId: string,
  ): Promise<DefaultResponse> {
    await validate(dto);

    const project = await this.projectService.getById(projectId);
    if (!project || project.createdUser?.id !== userId) {
      throw new HttpException(
        'Você não tem permissão para alterar esse projeto.',
        HttpStatus.FORBIDDEN,
      );
    }
    const maxOrder = await this.swimlaneRepository
      .createQueryBuilder('swimlane')
      .select('MAX(swimlane.order)', 'max')
      .where('swimlane.project.id = :projectId', { projectId: projectId })
      .getRawOne();

    const nextOrder = (parseInt(maxOrder?.max) || 0) + 1;

    const swimlane = Swimlane.newInstance({
      description: dto.description,
      order: nextOrder,
      createdAt: new Date(),
      project,
      createdUser: User.newInstance({ id: userId }),
    });

    const saved = await this.swimlaneRepository.save(swimlane);

    return {
      id: saved.id,
    };
  }

  public async findAllByProject(
    projectId: string,
  ): Promise<{ id: string; data: Swimlane[] }> {
    const swimlanes = await this.swimlaneRepository.findAllByProject(projectId);

    return {
      id: projectId,
      data: swimlanes,
    };
  }

  public async update(
    id: string,
    dto: SwimlaneUpdateDto,
  ): Promise<DefaultResponse> {
    await validate(dto);

    const swimlane = await this.swimlaneRepository.findOne({ where: { id } });

    if (!swimlane) {
      throw new HttpException('Raia não encontrada.', HttpStatus.NOT_FOUND);
    }

    swimlane.description = dto.description;
    swimlane.updatedAt = new Date();

    const saved = await this.swimlaneRepository.save(swimlane);

    return {
      id: saved.id,
    };
  }

  public async delete(
    id: string,
    projectId: string,
    userId: string,
  ): Promise<DefaultResponse> {
    const swimlane = await this.swimlaneRepository.findOne({
      where: { id, project: { id: projectId } },
      relations: { project: true, createdUser: true },
    });

    if (!swimlane || swimlane.createdUser?.id !== userId) {
      throw new HttpException(
        'Você não tem permissão de deletar essa swimlane.',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.swimlaneRepository.softRemove(swimlane);

    return {
      id: swimlane.id,
    };
  }
}
