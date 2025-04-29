import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SecurityGuard } from 'src/security/security.guard';
import { SwimlaneService } from './swimlane.service';
import { ProjectGuard } from 'src/project/project.guard';
import { SwimlaneCreateDto } from './dtos/swimlane.create.dto';
import { InstanceCredential } from 'src/security/security.provider';
import { CredentialDto } from 'src/auth/dtos/credential.dto';
import { ProjectTeamGuard } from 'src/project/project-team.guard';
import { SwimlaneUpdateDto } from './dtos/swimlane.update.dto';

@UseGuards(SecurityGuard)
@Controller('projects/:projectId/swimlanes')
export class SwimlaneController {
  constructor(private readonly swimlaneService: SwimlaneService) {}

  @UseGuards(ProjectGuard)
  @Post()
  async create(
    @Param('projectId') projectId: string,
    @Body() dto: SwimlaneCreateDto,
    @InstanceCredential<CredentialDto>() credential: CredentialDto,
  ) {
    const userId = credential.id;
    return await this.swimlaneService.create(dto, projectId, userId);
  }

  @UseGuards(ProjectTeamGuard)
  @Get()
  async findAll(@Param('projectId') projectId: string) {
    return await this.swimlaneService.findAllByProject(projectId);
  }

  @UseGuards(ProjectGuard)
  @Put(':id')
  async update(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Body() dto: SwimlaneUpdateDto,
  ) {
    return await this.swimlaneService.update(id, dto);
  }

  @UseGuards(ProjectGuard)
  @Delete(':id')
  async delete(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @InstanceCredential<CredentialDto>() credential: CredentialDto,
  ) {
    const userId = credential.id;
    return await this.swimlaneService.delete(id, projectId, userId);
  }
}
