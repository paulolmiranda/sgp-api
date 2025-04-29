import { IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';

export class StoryTaskUpdateDto {
  @IsString()
  @IsOptional()
  @MaxLength(250)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1800)
  description?: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
  storyId: string;
  id: string;
}
