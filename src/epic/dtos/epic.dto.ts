import { Epic } from '../epic.entity';

export class EpicDto {
  id: string;
  description: string;

  static fromEntity(e: Epic): EpicDto {
    const dto = new EpicDto();
    dto.id = e.id;
    dto.description = e.description;
    return dto;
  }
}
