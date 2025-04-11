import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EpicRepository } from './epic.repository';
import { Epic } from './epic.entity';
import { CreateEpicDto } from './dtos/create-epic.dto';
import { UpdateEpicDto } from './dtos/update-epic.dto';
import { User } from '@app/user';
import { Repository } from 'typeorm';
import { Project } from '@app/project';
import { Feature } from './feature.entity';
import { Story } from './story.entity';


@Injectable()
export class EpicService {
  constructor(
    private readonly epicRepository: EpicRepository,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findByUser(userId: string): Promise<Epic[]> {
    return this.epicRepository.findByUser(userId);
  }

  async create(createEpicDto: CreateEpicDto, userId: string): Promise<Epic> {
    const project = await this.projectRepository.findOne({
      where: { id: createEpicDto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const epic = this.epicRepository.create({
      ...createEpicDto,
      createdUser: { id: userId } as User, // Referência apenas pelo ID
      project,
    });

    try {
      return await this.epicRepository.save(epic);
    } catch (error) {
      console.error('Erro ao salvar o épico:', error);
      throw new InternalServerErrorException('Erro ao salvar o épico');
    }
  }

  async findAll(userId: string): Promise<Epic[]> {
    return this.epicRepository.findByUser(userId);
  }

  async findOne(id: string, userId: string): Promise<Epic> {
    const epic = await this.epicRepository.findOne({
      where: { id, createdUser: { id: userId } },
      relations: ['project', 'createdUser', 'updateUser', 'features', 'stories'],
    });

    if (!epic) {
      throw new NotFoundException(
        'Épico não encontrado ou você não tem permissão para visualizá-lo',
      );
    }

    return epic;
  }

  async update(id: string, updateEpicDto: UpdateEpicDto, userId: string): Promise<Epic> {
    const epic = await this.findOne(id, userId);
    Object.assign(epic, updateEpicDto);
    epic.updateUser = { id: userId } as User;

    try {
      return await this.epicRepository.save(epic);
    } catch (error) {
      console.error('Erro ao atualizar o épico:', error);
      throw new InternalServerErrorException('Erro ao atualizar o épico');
    }
  }

  async remove(id: string, userId: string): Promise<void> {
    const epic = await this.findOne(id, userId);

    await this.epicRepository.manager
      .createQueryBuilder()
      .update(Feature)
      .set({ epic: null })
      .where('epic_id = :id', { id: epic.id })
      .execute();

    await this.epicRepository.manager
      .createQueryBuilder()
      .update(Story)
      .set({ epic: null })
      .where('epic_id = :id', { id: epic.id })
      .execute();

    await this.epicRepository.softDelete(id);
  }

  async findByProject(projectId: string): Promise<Epic[]> {
    return this.epicRepository.findByProject(projectId);
  }

  async delete(id: string, userId: string): Promise<void> {
    const epic = await  this.epicRepository.findOne({ where: { id, createdUser: { id: userId } } });
  
    if (!epic) {
      throw new NotFoundException('Epic not found');
    }
  
    await  this.epicRepository.remove(epic);
  }
}  
