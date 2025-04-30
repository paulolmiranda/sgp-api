import { StoryTask } from '@app/agile/story-task.entity';

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CreateStoryTaskDto } from '../../libs/agile/src/story-tasks/dto/create-story-task.dto';
import { StoryTaskService } from '../../libs/agile/src/story-tasks/storytask.service';
import { CredentialDto } from '@app/auth';
import { SecurityGuard, InstanceCredential } from '@app/security';
import { UpdateStoryTaskDto } from '../../libs/agile/src/story-tasks/dto/update-story-task.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser extends Request {
  user?: { id: string };
}

@Controller('storytasks')
export class StoryTaskController {
  constructor(private readonly storyTaskService: StoryTaskService) {}

  @Post('create')
  @UseGuards(SecurityGuard)
  async create(
    @Body() createStoryTaskDto: CreateStoryTaskDto,
    @InstanceCredential<CredentialDto>() credential: CredentialDto,
  ): Promise<StoryTask> {
    return this.storyTaskService.create(createStoryTaskDto, credential.id);
  }

  @Patch(':id')
  @UseGuards(SecurityGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStoryTaskDto,
    @InstanceCredential() credential: CredentialDto,
  ) {
    return this.storyTaskService.update(id, dto, credential.id);
  }

  @Get()
  async list(): Promise<StoryTask[]> {
    return this.storyTaskService.list();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.storyTaskService.delete(id);
  }

  @Patch(':id/done')
  async done(@Param('id') id: string) {
    return this.storyTaskService.done(id);
  }

  @Patch(':id/undone')
  async undone(@Param('id') id: string) {
    return this.storyTaskService.undone(id);
  }
}
