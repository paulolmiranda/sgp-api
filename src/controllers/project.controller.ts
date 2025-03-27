import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CredentialDto } from '@app/auth';
import { DefaultResponse } from '@app/commons';
import { InstanceCredential, SecurityGuard } from '@app/security';
import { Project, ProjectCreateDto, ProjectService } from '@app/project';

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
  public getById(id: string): Promise<Project> {
    return this.projectService.getById(id);
  }
}
