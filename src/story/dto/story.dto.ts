import { Dto } from '../../commons/dto';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class StoryDto extends Dto {
  public id?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public description!: string;

  @IsNotEmpty()
  public startAt!: string;

  public endAt?: string;

  @IsUUID()
  @IsNotEmpty()
  public createdUserId!: string;

  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  public taskIds: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  public noteIds: string[];

  @IsUUID()
  @IsNotEmpty()
  public featureId: string;

  @IsUUID()
  @IsNotEmpty()
  public projectId: UUID;

  @IsUUID()
  @IsNotEmpty()
  public epicId: string;
}
