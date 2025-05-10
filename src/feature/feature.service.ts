import { Injectable, NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { Feature } from './feature.entity';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { UpdateFeatureDto } from './dtos/update-feature.dto';
import { FeatureDto } from './dtos/feature.dto';
import { DefaultResponse } from 'src/commons/default-response';
import { User } from 'src/user/user.entity';
import { FeatureRepository } from './feature.repository';
import { ProjectService } from 'src/project/project.service';
import { EpicRepository } from 'src/epic/epic.repository';
@Injectable()
export class FeatureService {
  constructor(
    private readonly featureRepo: FeatureRepository,
    private readonly projectSvc: ProjectService,
    private readonly epicRepo: EpicRepository,
  ) {}
  public async create(dto: CreateFeatureDto, userId: string): Promise<DefaultResponse> {
    await validate(dto);

    const project = await this.projectSvc.getById(dto.projectId);
    if (!project) throw new NotFoundException('Projeto não encontrado');

    const epic = await this.epicRepo.findOne({ where: { id: dto.epicId } });
    if (!epic) throw new NotFoundException('Épico não encontrado');

    const feature = Feature.newInstance({
      description: dto.description,
      project,
      epic,
      createdUser: User.newInstance({ id: userId }),
      createdAt: new Date(),
    });

    const saved = await this.featureRepo.save(feature);
    return { id: saved.id };
  }
  public async update(
    id: string,
    dto: UpdateFeatureDto,
    userId: string,
  ): Promise<DefaultResponse> {
    await validate(dto);

    const feature = await this.featureRepo.findOne({
      where: { id },
      relations: ['project', 'createdUser', 'project.createdUser'],
    });

    if (
      !feature ||
      (feature.project.createdUser.id !== userId &&
       feature.createdUser.id !== userId)
    ) {
      throw new NotFoundException('Feature não encontrada ou não autorizada');
    }

    feature.description = dto.description;
    feature.updatedAt   = new Date();
    feature.updateUser  = User.newInstance({ id: userId });

    const updated = await this.featureRepo.save(feature);
    return { id: updated.id };
  }
  public async listByProject(projectId: string): Promise<FeatureDto[]> {
    const project = await this.projectSvc.getById(projectId);
    if (!project) throw new NotFoundException('Projeto não encontrado');

    const features = await this.featureRepo.findByProject(projectId);
    return features.map(FeatureDto.fromEntity);
  }
  public async remove(id: string, userId: string): Promise<void> {
    const feature = await this.featureRepo.findOne({
      where: { id },
      relations: ['project', 'createdUser', 'project.createdUser'],
    });

    if (
      !feature ||
      (feature.project.createdUser.id !== userId &&
       feature.createdUser.id !== userId)
    ) {
      throw new NotFoundException('Feature não encontrada ou não autorizada');
    }

    await this.featureRepo.softRemove(feature);
  }
}
