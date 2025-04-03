import { IsString, IsUUID, Length } from 'class-validator';

export class CreateEpicDto {
  @IsUUID()
  projectId: string;

  @IsString()
  @Length(1, 2000)
  description: string;
}
