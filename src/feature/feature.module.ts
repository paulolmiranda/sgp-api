import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Feature } from './feature.entity';
import { FeatureService } from './feature.service';
import { FeatureRepository } from './feature.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [FeatureService, FeatureRepository],
})
export class FeatureModule {}
