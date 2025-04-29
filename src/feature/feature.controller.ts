import {
    Controller,
    Post,
    Put,
    Get,
    Delete,
    Param,
    Body,
    UseGuards,
  } from '@nestjs/common';
  
  import { FeatureService } from './feature.service';
  import { CreateFeatureDto } from './dtos/create-feature.dto';
  import { UpdateFeatureDto } from './dtos/update-feature.dto';
  import { FeatureDto } from './dtos/feature.dto';
  import { DefaultResponse } from 'src/commons/default-response';
  import { CredentialDto } from 'src/auth/dtos/credential.dto';
  import { SecurityGuard } from 'src/security/security.guard';
  import { InstanceCredential } from 'src/security/security.provider';
  import { ProjectTeamGuard } from 'src/project/project-team.guard'; 
  @Controller('features')
  @UseGuards(SecurityGuard, ProjectTeamGuard)  
  export class FeatureController {
    constructor(private readonly featureSvc: FeatureService) {}
    @Post()
    public create(
      @Body() dto: CreateFeatureDto,
      @InstanceCredential() cred: CredentialDto,
    ): Promise<DefaultResponse> {
      return this.featureSvc.create(dto, cred.id);
    }
    @Put(':id')
    public update(
      @Param('id') id: string,
      @Body() dto: UpdateFeatureDto,
      @InstanceCredential() cred: CredentialDto,
    ): Promise<DefaultResponse> {
      return this.featureSvc.update(id, dto, cred.id);
    }
    @Get('project/:projectId')
    public listByProject(
      @Param('projectId') projectId: string,
    ): Promise<FeatureDto[]> {
      return this.featureSvc.listByProject(projectId);
    }
    @Delete(':id')
    public remove(
      @Param('id') id: string,
      @InstanceCredential() cred: CredentialDto,
    ): Promise<void> {
      return this.featureSvc.remove(id, cred.id);
    }
  }
  