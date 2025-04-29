import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Epic } from './epic.entity';
import { EpicService } from './epic.service';
import { EpicRepository } from './epic.repository';
import { EpicController } from './epic.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Epic]), ProjectModule],
  providers: [EpicService, EpicRepository],
  controllers: [EpicController],
  exports: [EpicService],
})
export class EpicModule {}
