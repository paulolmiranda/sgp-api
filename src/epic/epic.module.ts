import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Epic } from './epic.entity';
import { EpicService } from './epic.service';
import { EpicRepository } from './epic.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Epic])],
  providers: [EpicService, EpicRepository],
})
export class EpicModule {}
