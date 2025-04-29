import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Dto } from 'src/commons/dto';

export class ProjectUpdateDto extends Dto {
  @IsUUID()
  @IsOptional()
  public id?: string;

  @IsUUID()
  @IsOptional()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public title: string;

  @IsNotEmpty()
  @MaxLength(2000)
  public description: string;
}
