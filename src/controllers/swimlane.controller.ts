import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SwimlaneService } from '@app/project'; // Este caminho vem do index.ts
import { SwimlaneCreateDto } from '@app/project'; // Também vem do index.ts
import { SecurityGuard } from '@app/security';

@Controller('swimlanes')
export class SwimlaneController {
  constructor(private readonly swimlaneService: SwimlaneService) {}

  @UseGuards(SecurityGuard)
  @Post()
  async create(@Body() dto: SwimlaneCreateDto, @Req() req) {
    const userId = req.credential.id;
    return this.swimlaneService.create(dto, userId);
  }

  @UseGuards(SecurityGuard)
  @Get(':projectId')
  async findAll(@Param('projectId') projectId: string, @Req() req) {
    const userId = req.credential.id;
    return this.swimlaneService.findAllByProject(projectId, userId);
  }

  @UseGuards(SecurityGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: SwimlaneCreateDto,
    @Req() req,
  ) {
    const userId = req.credential.id;
    return this.swimlaneService.update(id, dto, userId);
  }

  @UseGuards(SecurityGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    const userId = req.credential.id;
    return this.swimlaneService.delete(id, userId);
  }
}
