import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class StoryTaskCreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1800)
  description: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  storyId: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
  id: string;
}
