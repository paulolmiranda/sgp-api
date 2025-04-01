import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { DefaultResponse } from '@app/commons';
import { Story, StoryDto, StoryService } from '@app/agile';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  public create(@Body() storyDto: StoryDto): Promise<DefaultResponse> {
    this.storyService.create(storyDto);
    return;
  }

  @Get('id')
  getById(@Param('id') id: string): Promise<Story> {
    return this.storyService.getById(id);
  }

  @Get('many')
  getMany(@Param('many') amount: number): Promise<Story[]> {
    return this.storyService.getMany(amount);
  }

  @Patch()
  update(@Body() storyDto: StoryDto): Promise<DefaultResponse> {
    this.storyService.update(storyDto);
    return;
  }

  @Delete()
  delete(@Param('id') id: string): Promise<DefaultResponse> {
    this.storyService.delete(id);
    return;
  }
}
