import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Feature } from './feature.entity';

@Injectable()
export class FeatureRepository extends Repository<Feature> {
  constructor(private dataSource: DataSource) {
    super(Feature, dataSource.createEntityManager());
  }

  createFeature(data: Partial<Feature>): Feature {
    return this.create(data);
  }

  async findByIdWithCreator(id: string): Promise<Feature | null> {
    return this.findOne({
      where: { id },
      relations: ['createdUser'],
    });
  }

  async findById(id: string): Promise<Feature | null> {
    return this.findOne({ where: { id } });
  }

  async findAll(): Promise<Feature[]> {
    return this.find();
  }

  async softRemoveFeature(feature: Feature): Promise<void> {
    await this.softRemove(feature);
  }
}
