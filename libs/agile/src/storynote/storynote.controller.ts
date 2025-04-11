import {
  Controller,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '@app/user';
import { StoryNoteService } from './storynote.service';
import { JwtAuthGuard } from 'libs/auth/jwt-auth.guard';
import { CreateStoryNoteDto } from './dto/create-story_note.dto';
import { UpdateStoryNoteDto } from './dto/update-story_note.dto';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('story-notes')
export class StoryNoteController {
  constructor(private readonly storyNoteService: StoryNoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateStoryNoteDto, @Req() req: AuthenticatedRequest) {
    return this.storyNoteService.create(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateStoryNoteDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.storyNoteService.update(id, dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.storyNoteService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.storyNoteService.findAll();
  }
}
