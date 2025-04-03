import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { EpicService, CreateEpicDto, UpdateEpicDto } from '@app/agile';
import { SecurityGuard } from '@app/security/security.guard';
import { User } from '@app/user';

@Controller('epics')
@UseGuards(SecurityGuard)
export class EpicController {
  constructor(private readonly epicService: EpicService) {}
// 
  @Post()
  async create(@Body() dto: CreateEpicDto, @Req() req) {
    const user: User = req.user || req.credential;
    console.log('Usuário autenticado na EpicController:', user);
    if (!user || !user.id) {
      throw new UnauthorizedException('Usuário não autenticado ou inválido');
    }
    return this.epicService.create(dto, user);
  }

  @Get()
  async findAll(@Req() req) {
    const user: User = req.user || req.credential;
    if (!user || !user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return this.epicService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const user: User = req.user || req.credential;
    if (!user || !user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return this.epicService.findOne(id, user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEpicDto, @Req() req) {
    const user: User = req.user || req.credential;
    if (!user || !user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return this.epicService.update(id, dto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const user: User = req.user || req.credential;
    if (!user || !user.id) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return this.epicService.remove(id, user);
  }
}
