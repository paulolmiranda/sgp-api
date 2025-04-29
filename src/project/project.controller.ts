import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
  Patch,
} from '@nestjs/common';

import { Project } from './project.entity';
import { ProjectGuard } from './project.guard';
import { ProjectService } from './project.service';
import { SecurityGuard } from 'src/security/security.guard';
import { ProjectCreateDto } from './dtos/project-create.dto';
import { CredentialDto } from 'src/auth/dtos/credential.dto';
import { DefaultResponse } from 'src/commons/default-response';
import { InstanceCredential } from 'src/security/security.provider';
import { ProjectTeamGuard } from './project-team.guard';
import { ProjectUpdateDto } from './dtos/project-update.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(SecurityGuard)
  public create(
    @Body() projectDto: ProjectCreateDto,
    @InstanceCredential<CredentialDto>() credencial: CredentialDto,
  ): Promise<DefaultResponse> {
    return this.projectService.create(projectDto, credencial.id);
  }

  @Get(':projectId')
  @UseGuards(SecurityGuard, ProjectTeamGuard)
  public getById(@Param('projectId') id: string): Promise<Project | null> {
    return this.projectService.getById(id);
  }
  
  @Get()
  @UseGuards(SecurityGuard, ProjectTeamGuard )
  public getAll(
    @InstanceCredential<CredentialDto>() credencial: CredentialDto,
  ): Promise<Project[]> {
    return this.projectService.getAll(credencial.id);
  }

  @Patch(':projectId')
  @UseGuards(SecurityGuard, ProjectGuard)
  public update(
    @Param('projectId') id: string,
    @Body() projectDto: ProjectUpdateDto,
    @InstanceCredential<CredentialDto>() credencial: CredentialDto,
  ): Promise<DefaultResponse> {
    projectDto.id = id;
    projectDto.userId = credencial.id;
    return this.projectService.update(projectDto);
  }
  
  @Delete(':projectId')
  @UseGuards(SecurityGuard, ProjectGuard)
  public delete(
    @Param('projectId') id: string,
    @InstanceCredential<CredentialDto>() credential: CredentialDto,
  ): Promise<void> {
    return this.projectService.delete(id, credential.id);
  }
}

