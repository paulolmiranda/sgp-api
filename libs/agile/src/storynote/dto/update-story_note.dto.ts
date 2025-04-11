import { IsOptional, IsString } from 'class-validator';

export class UpdateStoryNoteDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
