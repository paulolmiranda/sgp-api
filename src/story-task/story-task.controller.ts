import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StoryTaskService } from './story-task.service';
import { SecurityGuard } from 'src/security/security.guard';

import { InstanceCredential } from 'src/security/security.provider';

import { StoryTaskCreateDto } from './dto/create-story-task.dto';
import { CredentialDto } from 'src/auth/dtos/credential.dto';

import { ProjectTeamGuard } from 'src/project/project-team.guard';

@Controller('projects/:projectId/stories/:storyId/tasks')
@UseGuards(SecurityGuard)
export class StoryTaskController {
  constructor(private readonly service: StoryTaskService) {}

  @Post()
  @UseGuards(SecurityGuard)
  public create(
    @Param('storyId') storyId: string,
    @Body() dto: StoryTaskCreateDto,
    @InstanceCredential<CredentialDto>() cred: CredentialDto,
  ) {
    dto.storyId = storyId;
    return this.service.create(dto, cred.id, cred.id);
  }

  @Patch(':id')
  @UseGuards(ProjectTeamGuard)
  public update(
    @Param('storyId') storyId: string,
    @Param('id') id: string,
    @Body() dto: StoryTaskCreateDto,
    @InstanceCredential<CredentialDto>() cred: CredentialDto,
  ) {
    dto.id = id;
    dto.storyId = storyId;
    return this.service.update(dto, cred.id, cred.id);
  }

  @Get()
  @UseGuards(ProjectTeamGuard)
  public findAll(@Param('storyId') storyId: string) {
    return this.service.findAll(storyId);
  }

  @Delete(':id')
  @UseGuards(ProjectTeamGuard)
  public delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Patch(':id/done')
  @UseGuards(ProjectTeamGuard)
  public markAsDone(@Param('id') id: string) {
    return this.service.markAsDone(id);
  }

  @Patch(':id/undone')
  @UseGuards(ProjectTeamGuard)
  public markAsUndone(@Param('id') id: string) {
    return this.service.markAsUndone(id);
  }
}
