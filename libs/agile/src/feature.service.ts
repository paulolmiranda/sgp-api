import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Feature } from './feature.entity';
import { CreateFeatureDto } from './dtos/feature-create.dto';
import { UpdateFeatureDto } from './dtos/feature-update.dto';
import { FeatureRepository } from './feature.repository';
import { Project } from '@app/project';
import { Epic } from './epic.entity';
import { User } from '@app/user';

@Injectable()
export class FeatureService {
  constructor(
    private readonly featureRepository: FeatureRepository,
  ) { }

  async create(createFeatureDto: CreateFeatureDto, user: any): Promise<Feature> {
    const feature = this.featureRepository.createFeature(createFeatureDto);
    feature.createdUser = { id: user.id } as User;
    feature.project = { id: createFeatureDto.projectId } as Project;
    feature.epic = { id: createFeatureDto.epicId } as Epic;
    return this.featureRepository.save(feature);
  }
  async update(id: string, updateFeatureDto: UpdateFeatureDto, user: any): Promise<Feature> {
    const feature = await this.featureRepository.findByIdWithCreator(id);

    if (!feature) {
      throw new NotFoundException('Funcionalidade não encontrada');
    }
    if (feature.createdUser.id !== user.id) {
      throw new ForbiddenException('Apenas o responsável pode atualizar esta funcionalidade');
    }
    Object.assign(feature, updateFeatureDto);
    feature.updateUser = user;

    return this.featureRepository.save(feature);
  }
  async delete(id: string, user: any): Promise<void> {
    const feature = await this.featureRepository.findByIdWithCreator(id);

    if (!feature) {
      throw new NotFoundException('Funcionalidade não encontrada');
    }
    if (feature.createdUser.id !== user.id) {
      throw new ForbiddenException('Apenas o responsável pode excluir esta funcionalidade');
    }
    await this.featureRepository.softRemoveFeature(feature);
  }

  async list(user: any): Promise<Feature[]> {
    return this.featureRepository.findAll();
  }

  async getById(id: string, user: any): Promise<Feature> {
    const feature = await this.featureRepository.findById(id);

    if (!feature) {
      throw new NotFoundException('Funcionalidade não encontrada');
    }

    return feature;
  }
}
