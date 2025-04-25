import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
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

  @Put(':projectId')
  @UseGuards(SecurityGuard, ProjectGuard)
  public update(@Param('projectId') id: string): Promise<DefaultResponse> {
    return Promise.resolve({ id });
  }

  @Delete(':projectId')
  @UseGuards(SecurityGuard, ProjectGuard)
  public delete(@Param('projectId') id: string): Promise<DefaultResponse> {
    return Promise.resolve({ id });
  }

  @Get(':projectId')
  @UseGuards(SecurityGuard, ProjectTeamGuard)
  public getById(@Param('projectId') id: string): Promise<Project | null> {
    return this.projectService.getById(id);
  }
}
