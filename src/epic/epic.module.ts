import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Epic } from './epic.entity';
import { EpicService } from './epic.service';
import { EpicRepository } from './epic.repository';
import { ProjectModule } from 'src/project/project.module';
import { EpicController } from './epic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Epic]),
ProjectModule],
  providers: [EpicService, EpicRepository],
  controllers:[EpicController],
  exports: [EpicService],
})
export class EpicModule {}
