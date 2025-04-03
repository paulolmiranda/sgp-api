import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epic } from './epic.entity';
import { EpicService } from './epic.service';
import { Project } from '@app/project';
import { EpicRepository } from './epic.repository';
import { DataSource } from 'typeorm';

// IMPORTA o EpicController de src/controllers
import { EpicController } from 'src/controllers/epic.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Epic, Project]),
  ],
  controllers: [EpicController,],
  providers: [EpicService,   EpicService,
    {
      provide: EpicRepository,
      useFactory: (dataSource: DataSource) => new EpicRepository(dataSource),
      inject: [DataSource],
    },],
  exports: [EpicService,],
})
export class EpicModule {}
