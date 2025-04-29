import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StoryTaskRepository } from './story-task.repository';
import { StoryTaskCreateDto } from './dto/create-story-task.dto';
import { StoryTask } from './story-task.entity';
import { User } from 'src/user/user.entity';
import { validate } from 'class-validator';
import { StoryTaskUpdateDto } from './dto/update-story-task.dto';
import { Story } from 'src/story/story.entity';
import { ProjectService } from 'src/project/project.service';
import { DefaultResponse } from 'src/commons/default-response';

@Injectable()
export class StoryTaskService {
  constructor(
    private readonly repository: StoryTaskRepository,
    private readonly projectService: ProjectService,
  ) {}

  public async create(
    dto: StoryTaskCreateDto,
    userId: string,
    updateUserId: string,
  ): Promise<DefaultResponse> {
    await validate(dto);

    if (!dto.storyId) {
      throw new NotFoundException('Story ID é necessário.');
    }

    const story = await this.repository.manager.findOne(Story, {
      where: { id: dto.storyId },
      relations: ['project'],
    });

    if (!story || !story.project?.id) {
      throw new NotFoundException('Projeto associado à story não encontrado.');
    }

    const projectId = story.project.id;

    const isMember = await this.projectService.isMember(projectId, userId);
    if (!isMember) {
      throw new ForbiddenException('Usuário não é membro do time.');
    }

    const task = new StoryTask();
    task.title = dto.title;
    task.description = dto.description;

    const storyId = dto.storyId;
    if (typeof storyId !== 'string') {
      throw new NotFoundException('Story ID inválido.');
    }

    task.story = Story.newInstance({ id: storyId });
    task.createdUser = User.newInstance({ id: userId });
    task.updateUser = User.newInstance({ id: updateUserId });

    return this.repository.save(task);
  }

  public async update(
    dto: StoryTaskUpdateDto,
    userId: string,
    updateUserId: string,
  ): Promise<DefaultResponse> {
    await validate(dto);

    const task = await this.repository.findOne({ where: { id: dto.id } });
    if (!task?.id) {
      throw new NotFoundException('StoryTask não encontrada.');
    }

    const story = await this.repository.manager.findOne(Story, {
      where: { id: dto.storyId },
      relations: ['project'],
    });

    if (!story || !story.project?.id) {
      throw new NotFoundException('Projeto associado à story não encontrado.');
    }

    const projectId = story.project.id;

    const isMember = await this.projectService.isMember(projectId, userId);
    if (!isMember) {
      throw new ForbiddenException('Usuário não é membro do time.');
    }

    const storyId = dto.storyId;
    task.story = Story.newInstance({ id: storyId });
    task.createdUser = User.newInstance({ id: userId });
    task.updateUser = User.newInstance({ id: updateUserId });

    return this.repository.save(task);
  }

  public async findAll(storyId: string): Promise<DefaultResponse[]> {
    if (!storyId) {
      throw new NotFoundException('Story ID é necessário.');
    }

    return this.repository.find({
      where: { story: { id: storyId } },
    });
  }

  public async delete(id: string): Promise<void> {
    const task = await this.repository.findOne({ where: { id } });
    if (!task?.id) {
      throw new NotFoundException('StoryTask não encontrada.');
    }
    await this.repository.softRemove(task);
  }

  public async markAsDone(id: string): Promise<DefaultResponse> {
    const task = await this.repository.findOne({ where: { id } });
    if (!task?.id) {
      throw new NotFoundException('StoryTask não encontrada.');
    }
    task.done = true;
    return this.repository.save(task);
  }

  public async markAsUndone(id: string): Promise<DefaultResponse> {
    const task = await this.repository.findOne({ where: { id } });
    if (!task?.id) {
      throw new NotFoundException('StoryTask não encontrada.');
    }
    task.done = false;
    return this.repository.save(task);
  }
}
