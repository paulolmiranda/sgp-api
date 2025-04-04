import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { CredentialDto } from '@app/auth';
import { DefaultResponse } from '@app/commons';
import { InstanceCredential, SecurityGuard } from '@app/security';
import { Project, ProjectCreateDto, ProjectService } from '@app/project';
import { ProjectUpdateDto } from '@app/project/dtos/project-update.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post('create')
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

  @Patch(':id')
  @UseGuards(SecurityGuard)
  async updateProject(
    @Param('id') id: string,
    @Body() projectUpdateDto: ProjectUpdateDto,
    @InstanceCredential<CredentialDto>() credencial: CredentialDto, // Obtendo o usuário autenticado
  ): Promise<DefaultResponse> {
    return this.projectService.updateProject(id, projectUpdateDto, credencial.id); // Passando o ID do usuário autenticado
  }

  @Get()
  @UseGuards(SecurityGuard)
  async listProjects(
    @InstanceCredential<CredentialDto>() credencial: CredentialDto,
  ): Promise<Project[]> {
    return this.projectService.listProjects(credencial.id);
  }

  @Delete(':id')
  @UseGuards(SecurityGuard)
  public deleteProject(
    @Param('id') id: string,
    @InstanceCredential<CredentialDto>() credencial: CredentialDto,
  ): Promise<DefaultResponse> {
    return this.projectService.deleteProject(id, credencial.id);
  }



}
