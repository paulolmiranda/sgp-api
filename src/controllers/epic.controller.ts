import { Controller, Get, Post, Body, Param, Put, UseGuards, Delete } from '@nestjs/common';
import { CreateEpicDto, UpdateEpicDto} from '@app/agile';
import { EpicService } from '@app/agile/epic.service';
import { SecurityGuard } from '@app/security/security.guard';
import { InstanceCredential } from '@app/security/security.provider';
import { CredentialDto } from '@app/auth/dtos/credential.dto';
import { Epic } from '@app/agile/epic.entity';

@Controller('epics')
@UseGuards(SecurityGuard)
export class EpicController {
  constructor(private readonly epicService: EpicService) {}

  @Get()
  async listEpics(
    @InstanceCredential() credential: CredentialDto,
  ): Promise<Epic[]> {
    return this.epicService.findByUser(credential.id);
  }

  @Post()
  async createEpic(
    @Body() dto: CreateEpicDto,
    @InstanceCredential() credential: CredentialDto,
  ): Promise<Epic> {
    return this.epicService.create(dto, credential.id);
  }

  @Put(':id')
  async updateEpic(
    @Param('id') id: string,
    @Body() dto: UpdateEpicDto,
    @InstanceCredential() credential: CredentialDto,
  ): Promise<Epic> {
    return this.epicService.update(id, dto, credential.id);
  }

  @Delete(':id')
async deleteEpic(
  @Param('id') id: string,
  @InstanceCredential() credential: CredentialDto,
): Promise<void> {
  return this.epicService.delete(id, credential.id);
}

}
