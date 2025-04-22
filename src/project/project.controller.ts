import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { SecurityGuard } from 'src/security/security.guard';
import { ProjectCreateDto } from './dtos/project-create.dto';
import { CredentialDto } from 'src/auth/dtos/credential.dto';
import { DefaultResponse } from 'src/commons/default-response';
import { InstanceCredential } from 'src/security/security.provider';

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

  @Get(':id')
  @UseGuards(SecurityGuard)
  public getById(id: string): Promise<Project | null> {
    return this.projectService.getById(id);
  }
}
