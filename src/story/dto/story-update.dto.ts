import { Dto } from '../../commons/dto';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class StoryUpdateDto extends Dto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @MaxLength(200)
  public title?: string;

  @IsString()
  @MaxLength(200)
  public description?: string;

  @IsString()
  public startAt?: string;

  @IsString()
  public endAt?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  public taskIds?: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  public noteIds?: string[];

  @IsUUID()
  public projectId?: UUID;

  @IsUUID()
  public epicId?: string;
}
