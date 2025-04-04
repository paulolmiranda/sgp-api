import { IsOptional, IsString, IsUUID, IsBoolean } from 'class-validator';

export class UpdateStoryTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  story_id: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;

  get story() {
    return this.story_id ? { id: this.story_id } : undefined;
  }
}
