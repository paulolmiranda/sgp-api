import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user';
import { StoryNote } from '../story-note.entity';
import { CreateStoryNoteDto } from './dto/create-story_note.dto';
import { UpdateStoryNoteDto } from './dto/update-story_note.dto';

@Injectable()
export class StoryNoteService {
  constructor(
    @InjectRepository(StoryNote)
    private readonly storyNoteRepository: Repository<StoryNote>,
  ) {}

  async create(
    createStoryNoteDto: CreateStoryNoteDto,
    user: User,
  ): Promise<StoryNote> {
    const storyNote = this.storyNoteRepository.create({
      ...createStoryNoteDto,
      createdUser: user,
    });
    return this.storyNoteRepository.save(storyNote);
  }

  async update(
    id: string,
    updateStoryNoteDto: UpdateStoryNoteDto,
    user: User,
  ): Promise<StoryNote> {
    const storyNote = await this.storyNoteRepository.findOne({
      where: { id },
      relations: ['createdUser'],
    });
    if (!storyNote) {
      throw new NotFoundException('Nota não encontrada');
    }
    if (storyNote.createdUser.id !== user.id) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar esta nota',
      );
    }
    Object.assign(storyNote, updateStoryNoteDto);
    return this.storyNoteRepository.save(storyNote);
  }

  async delete(id: string, user: User): Promise<void> {
    const storyNote = await this.storyNoteRepository.findOne({
      where: { id },
      relations: ['createdUser'],
    });
    if (!storyNote) {
      throw new NotFoundException('Nota não encontrada');
    }
    if (storyNote.createdUser.id !== user.id) {
      throw new ForbiddenException(
        'Você não tem permissão para excluir esta nota',
      );
    }
    await this.storyNoteRepository.delete(id);
  }

  async findAll(): Promise<StoryNote[]> {
    return this.storyNoteRepository.find({
      relations: ['createdUser'], 
    });
  }
}
