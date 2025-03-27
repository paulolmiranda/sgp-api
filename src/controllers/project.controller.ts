import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CredentialDto } from '@app/auth';
import { DefaultResponse } from '@app/commons';
import { ProjectCreateDto, ProjectService } from '@app/project';
import { InstanceCredential, SecurityGuard } from '@app/security';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(SecurityGuard)
  public create(
    @Body() projectDto: ProjectCreateDto,
    @InstanceCredential<CredentialDto>() credencial: CredentialDto,
  ): Promise<DefaultResponse> {
    projectDto.userId = credencial.id;
    return this.projectService.create(projectDto);
  }
}
