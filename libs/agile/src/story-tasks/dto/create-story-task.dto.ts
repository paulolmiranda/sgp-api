import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateStoryTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  story_id: string;

  get story() {
    return { id: this.story_id };
  }
}
