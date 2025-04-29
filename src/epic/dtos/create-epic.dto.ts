import { IsNotEmpty, IsUUID, IsString, Length } from 'class-validator';

export class CreateEpicDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 2000)
  description: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}
