import { Injectable } from '@nestjs/common';

import { User } from '@app/user';
import { v4 as uuid } from 'uuid';
import { Project } from '@app/project';
import { validate } from '@app/commons';

import { UUID } from 'crypto';
import { Epic } from '../epic.entity';
import { Story } from './story.entity';
import { Feature } from '../feature.entity';
import { StoryTask } from '../story-task.entity';
import { StoryNote } from '../story-note.entity';
import { StoryDto } from '../story.dto/story.dto';
import { StoryRepository } from './story.repository';
import { StoryUpdateDto } from '../story.dto/story-update.dto';

@Injectable()
export class StoryService {
  constructor(private readonly storyRepository: StoryRepository) {}

  public async getById(id: UUID): Promise<Story> {
    return await this.storyRepository.findOneBy({ id });
  }

  public async getMany(amount: number): Promise<Story[]> {
    return await this.storyRepository.find({ take: amount });
  }

  public async create(storyDto: StoryDto) {
    await validate(storyDto);

    const dateNow: Date = new Date(Date.now());
    const startAt: Date = new Date(storyDto.startAt);
    let endAt: Date;
    let storyTasks: StoryTask[];
    let storyNotes: StoryNote[];

    if (storyDto.endAt) {
      endAt = new Date(storyDto.endAt);
    }

    if (storyDto.taskIds) {
      storyTasks = [];
      for (const taskId of storyDto.taskIds) {
        storyTasks.push(StoryTask.newInstance({ id: taskId }));
      }
    }

    if (storyDto.noteIds) {
      storyNotes = [];
      for (const noteId in storyDto.taskIds) {
        storyNotes.push(StoryTask.newInstance({ id: noteId }));
      }
    }

    const story = Story.newInstance({
      id: uuid().replaceAll('-', ''),
      title: storyDto.title,
      description: storyDto.description,
      startAt: startAt, //turn string to date
      endAt: endAt,
      createdAt: dateNow, //create code to get current date & time
      tasks: storyTasks,
      notes: storyNotes,
      project: Project.newInstance({ id: storyDto.projectId }), //associated project
      feature: Feature.newInstance({ id: storyDto.featureId }),
      epic: Epic.newInstance({ id: storyDto.epicId }),
      createdUser: User.newInstance({ id: storyDto.createdUserId }),
    });

    return await this.storyRepository.save(story);
  }

  public async update(storyDto: StoryUpdateDto) {
    await validate(storyDto);
    const foundStory = this.storyRepository.findOneBy({ id: storyDto.id });

    if (foundStory) {
      const story = Object.assign(foundStory, storyDto);

      return await this.storyRepository.save(story);
    }
  }

  public async delete(id: UUID) {
    return await this.storyRepository.softDelete({ id });
  }
}
