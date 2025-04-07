import { IsString, MaxLength, IsNotEmpty, IsUUID } from 'class-validator';
import { Dto } from '@app/commons';

export class CreateFeatureDto extends Dto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public title: string;

  @IsNotEmpty()
  @MaxLength(2000)
  public description: string;

  @IsUUID()
  @IsNotEmpty()
  public projectId: string; 

  @IsUUID()
  @IsNotEmpty()
  public epicId: string;
}
