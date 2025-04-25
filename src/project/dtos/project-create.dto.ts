import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Dto } from 'src/commons/dto';

export class ProjectCreateDto extends Dto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public title: string;

  @IsNotEmpty()
  @MaxLength(2000)
  public description: string;
}
