import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EpicService} from './epic.service';
import { CreateEpicDto} from './dtos/create-epic.dto';
import { UpdateEpicDto} from './dtos/update-epic.dto';
import { EpicDto } from './dtos/epic.dto';
import { DefaultResponse} from 'src/commons/default-response';
import { CredentialDto} from 'src/auth/dtos/credential.dto'
import { SecurityGuard} from 'src/security/security.guard';
import { ProjectTeamGuard } from '../project/project-team.guard';
import { InstanceCredential } from 'src/security/security.provider';

@Controller('epics')
@UseGuards(SecurityGuard)
export class EpicController {
  constructor(private readonly epicService: EpicService) {}

  @Post()
  @UseGuards(ProjectTeamGuard)
  create(
    @Body() dto: CreateEpicDto,
    @InstanceCredential() cred: CredentialDto,
  ): Promise<DefaultResponse> {
    return this.epicService.create(dto, cred.id);
  }

  @Put(':id')
  @UseGuards(ProjectTeamGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEpicDto,
    @InstanceCredential() cred: CredentialDto,
  ): Promise<DefaultResponse> {
    return this.epicService.update(id, dto, cred.id);
  }

  @Get()
  @UseGuards(ProjectTeamGuard)
  list(
    @InstanceCredential() cred: CredentialDto,
  ): Promise<EpicDto[]> {
    return this.epicService.list(cred.id);
  }

  @Get('project/:projectId')
  @UseGuards(ProjectTeamGuard)
  listByProject(
    @Param('projectId') projectId: string,
  ): Promise<EpicDto[]> {
    return this.epicService.listByProject(projectId);
  }

  @Delete(':id')
  @UseGuards(ProjectTeamGuard)
  remove(
    @Param('id') id: string,
    @InstanceCredential() cred: CredentialDto,
  ): Promise<void> {
    return this.epicService.remove(id, cred.id);
  }
}
