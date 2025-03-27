import {
  IsUUID,
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Dto } from '@app/commons';

export class ProjectCreateDto extends Dto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  public title: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(2000)
  public description: string;

  @IsUUID()
  @IsNotEmpty()
  public userId: string;
}
