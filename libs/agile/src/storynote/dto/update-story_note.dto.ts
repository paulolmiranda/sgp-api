import { IsOptional, IsString } from 'class-validator';

export class UpdateStoryNoteDto {
  @IsOptional()
  @IsString()
  description?: string;
}
