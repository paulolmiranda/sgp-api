import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoryNoteDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
