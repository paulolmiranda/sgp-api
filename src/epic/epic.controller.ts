import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SecurityGuard } from 'src/security/security.guard';
import { ProjectTeamGuard } from 'src/project/project-team.guard';
import { InstanceCredential } from 'src/security/security.provider';

import { EpicService } from './epic.service';
import { CreateEpicDto } from './dtos/create-epic.dto';
import { UpdateEpicDto } from './dtos/update-epic.dto';
import { EpicDto } from './dtos/epic.dto';
import { DefaultResponse } from 'src/commons/default-response';
import { CredentialDto } from 'src/auth/dtos/credential.dto';

@Controller('epics')
@UseGuards(SecurityGuard, ProjectTeamGuard) 
export class EpicController {
  constructor(private readonly epicSvc: EpicService) {}

  @Post()
  public create(
    @Body() dto: CreateEpicDto,
    @InstanceCredential() cred: CredentialDto,
  ): Promise<DefaultResponse> {
    return this.epicSvc.create(dto, cred.id);
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateEpicDto,
    @InstanceCredential() cred: CredentialDto,
  ): Promise<DefaultResponse> {
    return this.epicSvc.update(id, dto, cred.id);
  }

  @Get()
  public list(@InstanceCredential() cred: CredentialDto): Promise<EpicDto[]> {
    return this.epicSvc.list(cred.id);
  }

  @Get('project/:projectId')
  public listByProject(
    @Param('projectId') projectId: string,
  ): Promise<EpicDto[]> {
    return this.epicSvc.listByProject(projectId);
  }

  @Delete(':id')
  public remove(
    @Param('id') id: string,
    @InstanceCredential() cred: CredentialDto,
  ): Promise<void> {
    return this.epicSvc.remove(id, cred.id);
  }
}
