import { Injectable } from '@nestjs/common';

import { validate } from '@app/commons';

import { Story } from './story.entity';
import { StoryDto } from './dto/story.dto';
import { StoryRepository } from './story.repository';

@Injectable()
export class StoryService {
  constructor(private readonly storyRepository: StoryRepository) {}

  public async getById(id: string): Promise<Story> {
    return this.storyRepository.findOneBy({ id });
  }

  public async getMany(amount: number): Promise<Story[]> {
    return this.storyRepository.find({ take: amount });
  }

  public async create(storyDto: StoryDto) {
    await validate(storyDto);

    this.storyRepository.insert(storyDto);
  }

  public async update(storyDto: StoryDto) {
    await validate(storyDto);

    this.storyRepository.save(storyDto);
  }

  public async delete(id: string) {
    this.storyRepository.delete({ id: id });
  }
}
