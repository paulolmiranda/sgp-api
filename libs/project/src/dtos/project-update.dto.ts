import { Dto } from '@app/commons';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ProjectUpdateDto extends Dto {


  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public title: string;


  @IsNotEmpty()
  @MaxLength(2000)
  public description: string;
}
