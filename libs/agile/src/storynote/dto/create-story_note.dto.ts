import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoryNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
