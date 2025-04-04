import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SwimlaneCreateDto } from './dtos/swimlane-create.dto';
import { Swimlane } from './swimlane.entity';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { BusinessException } from '@app/commons';
import { ExceptionCode } from 'messages';
import { User } from '@app/user';

@Injectable()
export class SwimlaneService {
  constructor(
    @InjectRepository(Swimlane)
    private readonly swimlaneRepository: Repository<Swimlane>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  public async create(
    dto: SwimlaneCreateDto,
    userId: string,
  ): Promise<Swimlane> {
    const project = await this.projectRepository.findOne({
      where: { id: dto.projectId },
      relations: ['createdUser'],
    });

    if (!project || !project.createdUser) {
      throw new BusinessException(ExceptionCode.PROJECT_001);
    }

    if (project.createdUser.id !== userId) {
      throw new BusinessException(ExceptionCode.SWIMLANE_001);
    }

    const maxOrder = await this.swimlaneRepository
      .createQueryBuilder('swimlane')
      .select('MAX(swimlane.order)', 'max')
      .where('swimlane.project.id = :projectId', { projectId: dto.projectId })
      .getRawOne();

    const nextOrder = (parseInt(maxOrder?.max) || 0) + 1;

    const swimlane = Swimlane.newInstance({
      description: dto.description,
      order: nextOrder,
      project,
      createdUser: User.newInstance({ id: userId }),
      createdAt: new Date(),
    });

    return this.swimlaneRepository.save(swimlane);
  }

  public async findAllByProject(
    projectId: string,
    userId: string,
  ): Promise<Swimlane[]> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['createdUser'],
    });

    if (!project) {
      throw new BusinessException(ExceptionCode.PROJECT_001);
    }

    if (project.createdUser.id !== userId) {
      throw new BusinessException(ExceptionCode.SWIMLANE_001);
    }

    return this.swimlaneRepository.find({
      where: { project: { id: projectId } },
      order: { order: 'ASC' },
    });
  }

  public async update(
    id: string,
    dto: SwimlaneCreateDto,
    userId: string,
  ): Promise<Swimlane> {
    const swimlane = await this.swimlaneRepository.findOne({
      where: { id },
      relations: ['project', 'project.createdUser'],
    });

    if (!swimlane) {
      throw new BusinessException(ExceptionCode.GLOBAL_003);
    }

    if (swimlane.project.createdUser.id !== userId) {
      throw new BusinessException(ExceptionCode.SWIMLANE_001);
    }

    swimlane.description = dto.description;
    return this.swimlaneRepository.save(swimlane);
  }

  public async delete(id: string, userId: string): Promise<void> {
    const swimlane = await this.swimlaneRepository.findOne({
      where: { id },
      relations: ['project', 'project.createdUser'],
    });
    if (!swimlane) {
      throw new BusinessException(ExceptionCode.GLOBAL_003);
    }
    if (swimlane.project.createdUser.id !== userId) {
      throw new BusinessException(ExceptionCode.SWIMLANE_001);
    }

    await this.swimlaneRepository.remove(swimlane);
  }
}
