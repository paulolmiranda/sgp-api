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

import { SecurityGuard } from '@app/security';
import { DefaultResponse } from '@app/commons';
import { Story, StoryDto, StoryService } from '@app/agile';
import { StoryUpdateDto } from '@app/agile/story.dto/story-update.dto';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('create')
  @UseGuards(SecurityGuard)
  public create(@Body() storyDto: StoryDto): void {
    this.storyService.create(storyDto);
  }

  @Get('get/:id')
  @UseGuards(SecurityGuard)
  getById(@Param('id') id: UUID): Promise<Story> {
    return this.storyService.getById(id);
  }

  @Get('get/:amount')
  @UseGuards(SecurityGuard)
  getMany(@Param('amount') amount: number): Promise<Story[]> {
    return this.storyService.getMany(amount);
  }

  @Patch('update')
  @UseGuards(SecurityGuard)
  update(@Body() storyDto: StoryUpdateDto): Promise<DefaultResponse> {
    return this.storyService.update(storyDto);
  }

  @Delete('delete/:id')
  @UseGuards(SecurityGuard)
  delete(@Param('id') id: UUID): Promise<DeleteResult> {
    return this.storyService.delete(id);
  }
}
