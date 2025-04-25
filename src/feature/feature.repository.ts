import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Feature } from './feature.entity';
import { BaseRepository } from 'src/commons/base-repository';

@Injectable()
export class FeatureRepository extends BaseRepository<Feature> {
  constructor(dataSource: DataSource) {
    super(Feature, dataSource.createEntityManager());
  }
}
