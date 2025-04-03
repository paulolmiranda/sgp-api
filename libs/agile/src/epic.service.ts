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
    @InjectRepository(EpicRepository)
    private readonly epicRepository: EpicRepository, // Usando o EpicRepository customizado

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}


/// Método para criar um épico
  async create(createEpicDto: CreateEpicDto, user: User): Promise<Epic> {
    const project = await this.projectRepository.findOne({
      where: { id: createEpicDto.projectId },
    });
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }
// Verifica se o usuário tem permissão para criar um épico nesse projeto
    const epic = this.epicRepository.create({
      ...createEpicDto,
      createdUser: user,
      project,
    });

    try {
      return await this.epicRepository.save(epic);
    } catch (error) {
      console.error('Erro ao salvar o épico:', error);
      throw new InternalServerErrorException('Erro ao salvar o épico');
    }
  }

  async findAll(user: User): Promise<Epic[]> {
    // Utiliza o método customizado que filtra épicos pelo usuário
    return this.epicRepository.findEpicsByUser(user.id);
  }
// Método para encontrar um épico específico
  async findOne(id: string, user: User): Promise<Epic> {
    const epic = await this.epicRepository.findOne({
      where: { id, createdUser: { id: user.id } },
      relations: ['project', 'createdUser', 'updateUser', 'features', 'stories'],
    });
    if (!epic) {
      throw new NotFoundException(
        'Épico não encontrado ou você não tem permissão para visualizá-lo',
      );
    }
    return epic;
  }

  async update(id: string, updateEpicDto: UpdateEpicDto, user: User): Promise<Epic> {
    const epic = await this.findOne(id, user);
    Object.assign(epic, updateEpicDto);
    epic.updateUser = user;

    try {
      return await this.epicRepository.save(epic);
    } catch (error) {
      console.error('Erro ao atualizar o épico:', error);
      throw new InternalServerErrorException('Erro ao atualizar o épico');
    }
  }

  async remove(id: string, user: User): Promise<void> {
    const epic = await this.findOne(id, user);

    // Atualiza as Features associadas, definindo a associação com o épico como null
    await this.epicRepository.manager
      .createQueryBuilder()
      .update(Feature)
      .set({ epic: null })
      .where("epic_id = :id", { id: epic.id })
      .execute();

    // Atualiza as Stories associadas
    await this.epicRepository.manager
      .createQueryBuilder()
      .update(Story)
      .set({ epic: null })
      .where("epic_id = :id", { id: epic.id })
      .execute();

    await this.epicRepository.softDelete(id);
  }

  async findByProject(projectId: string): Promise<Epic[]> {
    return this.epicRepository.findEpicsByProject(projectId);
  }
}
