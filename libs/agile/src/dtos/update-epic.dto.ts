import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateEpicDto {
  @IsOptional()
  @IsString()
  @Length(1, 2000)
  description?: string;
}
