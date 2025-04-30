import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateStoryTaskDto } from './dto/create-story-task.dto';
import { StoryTask } from '@app/agile/story-task.entity';
import { Repository } from 'typeorm';
import { UpdateStoryTaskDto } from './dto/update-story-task.dto';

@Injectable()
export class StoryTaskService {
  constructor(
    @InjectRepository(StoryTask)
    private readonly storyTaskRepository: Repository<StoryTask>,
  ) {}

  async create(dto: CreateStoryTaskDto, userId: string): Promise<StoryTask> {
    const task = this.storyTaskRepository.create({
      ...dto,
      story: { id: dto.story_id },
      createdUser: { id: userId },
    });

    return this.storyTaskRepository.save(task);
  }

  async update(
    id: string,
    updateStoryTaskDto: UpdateStoryTaskDto,
    userId: string,
  ): Promise<StoryTask> {
    const task = await this.storyTaskRepository.preload({
      id,
      ...updateStoryTaskDto,
      updateUser: { id: userId },
    });

    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }

    return this.storyTaskRepository.save(task);
  }

  async list(): Promise<StoryTask[]> {
    return this.storyTaskRepository.find();
  }

  async delete(id: string): Promise<void> {
    const result = await this.storyTaskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }
  }

  async done(id: string): Promise<StoryTask> {
    const task = await this.storyTaskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }

    task.done = true;

    return this.storyTaskRepository.save(task);
  }

  async undone(id: string): Promise<StoryTask> {
    const task = await this.storyTaskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada`);
    }

    task.done = false;

    return this.storyTaskRepository.save(task);
  }
}
