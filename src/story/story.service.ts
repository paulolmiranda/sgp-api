import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { UUID } from 'crypto';
import { validate } from 'uuid';
import { v4 as uuid_v4 } from 'uuid';

import { Story } from './story.entity';
import { StoryDto } from './dto/story.dto';
import { Epic } from 'src/epic/epic.entity';
import { User } from 'src/user/user.entity';
import { StoryRepository } from './story.repository';
import { Feature } from 'src/feature/feature.entity';
import { Project } from 'src/project/project.entity';
import { StoryUpdateDto } from './dto/story-update.dto';
import { StoryNote } from 'src/story-note/story-note.entity';
import { StoryTask } from 'src/story-task/story-task.entity';

@Injectable()
export class StoryService {
  constructor(private readonly storyRepository: StoryRepository) {}

  public async getById(id: UUID): Promise<Story> {
    try {
      const story = await this.storyRepository.findOneBy({ id });

      if (!story) {
        throw new NotFoundException(`Story com id "${id}" não encontrado!`);
      }

      return story;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }

      throw new InternalServerErrorException(
        'Não foi possível encontrar o story',
      );
    }
  }

  public async getMany(amount: number): Promise<Story[]> {
    try {
      const stories = await this.storyRepository.find({ take: amount });

      if (!stories) {
        throw new NotFoundException('Nenhum story encontrado!');
      }

      return stories;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }

      throw new InternalServerErrorException(
        'Não foi possível encontrar nenhum story',
      );
    }
  }

  public async create(storyDto: StoryDto) {
    await validate(storyDto);

    const dateNow: Date = new Date(Date.now());
    const startAt: Date = new Date(storyDto.startAt);

    const story = Story.newInstance({
      id: uuid_v4().replaceAll('-', ''),
      startAt: startAt,
      createdAt: dateNow,
      title: storyDto.title,
      description: storyDto.description,
      epic: Epic.newInstance({ id: storyDto.epicId }),
      project: Project.newInstance({ id: storyDto.projectId }),
      feature: Feature.newInstance({ id: storyDto.featureId }),
      createdUser: User.newInstance({ id: storyDto.createdUserId }),
    });

    if (storyDto.endAt) {
      story.endAt = new Date(storyDto.endAt);
    }

    if (storyDto.taskIds) {
      story.tasks = storyDto.taskIds.map((id) => StoryTask.newInstance({ id }));
    }

    if (storyDto.noteIds) {
      story.notes = storyDto.noteIds.map((id) => StoryNote.newInstance({ id }));
    }

    try {
      return await this.storyRepository.save(story);
    } catch {
      throw new InternalServerErrorException('Não foi possível criar o story');
    }
  }

  public async update(storyDto: StoryUpdateDto): Promise<Story> {
    await validate(storyDto);
    try {
      const foundStory = await this.storyRepository.findOneBy({
        id: storyDto.id,
      });

      if (!foundStory) {
        throw new NotFoundException(
          `Story com id "${storyDto.id}" não encontrado!`,
        );
      }

      const story = { ...foundStory, ...storyDto };

      return await this.storyRepository.save(story);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }

      throw new InternalServerErrorException(
        'Não foi possível encontrar o story',
      );
    }
  }

  public async delete(id: UUID) {
    const foundStory = await this.storyRepository.findOneBy({ id });

    if (!foundStory) {
      throw new NotFoundException(`Story com id "${id}" não encontrado!`);
    }

    return await this.storyRepository.softDelete({ id });
  }
}
