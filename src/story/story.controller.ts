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
import { UUID } from 'crypto';
import { DeleteResult } from 'typeorm';

import { Story } from './story.entity';
import { StoryDto } from './dto/story.dto';
import { StoryService } from './story.service';
import { StoryUpdateDto } from './dto/story-update.dto';
import { SecurityGuard } from '../security/security.guard';
import { DefaultResponse } from '../commons/default-response';
import { ProjectTeamGuard } from 'src/project/project-team.guard';

@UseGuards(SecurityGuard, ProjectTeamGuard)
@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('create')
  public create(@Body() storyDto: StoryDto): Promise<DefaultResponse> {
    return this.storyService.create(storyDto);
  }

  @Get('get/:id')
  getById(@Param('id') id: UUID): Promise<Story | DefaultResponse> {
    return this.storyService.getById(id);
  }

  @Get('get/:amount')
  getMany(@Param('amount') amount: number): Promise<Story[]> {
    return this.storyService.getMany(amount);
  }

  @Patch('update')
  update(@Body() storyDto: StoryUpdateDto): Promise<DefaultResponse> {
    return this.storyService.update(storyDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: UUID): Promise<DeleteResult> {
    return this.storyService.delete(id);
  }
}
