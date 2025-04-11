import { Controller, Post, Put, Delete, Get, Body, Param, Req } from '@nestjs/common';
import { FeatureService } from '@app/agile/feature.service';
import { CreateFeatureDto } from '@app/agile';
import { UpdateFeatureDto } from '@app/agile';
import { SecurityGuard } from '@app/security'; 
import { UseGuards } from '@nestjs/common';
import { CredentialDto } from '@app/auth/dtos/credential.dto';

@UseGuards(SecurityGuard)
@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}
  
  @Post()
  async create(@Body() dto: CreateFeatureDto, @Req() req: { credential: CredentialDto }) {
    return this.featureService.create(dto, req.credential); 
  }
  
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeatureDto: UpdateFeatureDto,
    @Req() req: { credential: CredentialDto },
  ) {
    return this.featureService.update(id, updateFeatureDto, req.credential);
  }
  
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: { credential: CredentialDto }) {
    return this.featureService.delete(id, req.credential);
  }
  
  @Get()
  async list(@Req() req: { credential: CredentialDto }) {
    return this.featureService.list(req.credential);
  }
  
  @Get(':id')
  async getById(@Param('id') id: string, @Req() req: { credential: CredentialDto }) {
    return this.featureService.getById(id, req.credential);
  }

}
  