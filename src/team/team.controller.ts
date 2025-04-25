import {
  Get,
  Put,
  Post,
  Body,
  Param,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { Team } from './team.entity';
import { TeamService } from './team.service';
import { ProjectGuard } from 'src/project/project.guard';
import { SecurityGuard } from 'src/security/security.guard';
import { CredentialDto } from 'src/auth/dtos/credential.dto';
import { DefaultResponse } from 'src/commons/default-response';
import { ProjectTeamGuard } from 'src/project/project-team.guard';
import { InstanceCredential } from 'src/security/security.provider';

@UseGuards(SecurityGuard)
@Controller('projects/:projectId/teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(ProjectTeamGuard)
  @Get()
  public getAll(@Param('projectId') projectId: string): Promise<Team[]> {
    return Promise.resolve([]);
  }

  @UseGuards(ProjectGuard)
  @Post()
  public create(
    @Param('projectId') projectId: string,
    @Body() teamDto: any,
    @InstanceCredential<CredentialDto>() credential: CredentialDto,
  ): Promise<DefaultResponse> {
    return Promise.resolve({ id: projectId });
  }

  @UseGuards(ProjectGuard)
  @Put(':teamId')
  public update(
    @Param('projectId') projectId: string,
    @Param('teamId') teamId: string,
    @Body() teamDto: any,
    @InstanceCredential<CredentialDto>() credential: CredentialDto,
  ): Promise<DefaultResponse> {
    return Promise.resolve({ id: projectId });
  }
}
