import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SwimlaneCreateDto {
  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsUUID()
  public projectId: string;
}
