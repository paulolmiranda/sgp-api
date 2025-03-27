import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Dto } from '@app/commons';

export class ProjectCreateDto extends Dto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public title: string;

  @IsNotEmpty()
  @MaxLength(2000)
  public description: string;
}
