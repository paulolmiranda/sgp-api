import { Dto } from '@app/commons';
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
  public title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public description: string;

  // @IsDate()
  @IsNotEmpty()
  public startAt?: string;

  // @IsDate()
  public endAt?: string;

  @IsUUID()
  @IsNotEmpty()
  public createdUserId: string;

  // @IsString()
  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  public taskIds: string[];

  // @IsString()
  @IsArray()
  @IsUUID('4', { each: true })
  public noteIds: string[];

  // @IsString()
  @IsUUID()
  @IsNotEmpty()
  public featureId: string;

  // @IsString()
  @IsUUID()
  @IsNotEmpty()
  public projectId: UUID;

  // @IsString()
  @IsUUID()
  @IsNotEmpty()
  public epicId: string;
}
