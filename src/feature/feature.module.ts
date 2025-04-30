import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature }           from './feature.entity';
import { FeatureRepository }  from './feature.repository';
import { FeatureService }     from './feature.service';
import { FeatureController }  from './feature.controller';
import { ProjectModule } from 'src/project/project.module';
import { EpicModule }    from 'src/epic/epic.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Feature]),  
    ProjectModule,                        
    EpicModule,                           
  ],
  providers: [
    FeatureService,
    FeatureRepository,                    
  ],
  controllers: [
    FeatureController,
  ],
  exports: [
    FeatureService                
  ],
})
export class FeatureModule {}
