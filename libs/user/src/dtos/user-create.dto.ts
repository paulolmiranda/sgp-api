import {
  IsUUID,
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Dto } from '@app/commons';

export class UserCreateDto extends Dto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  public email: string;

  @IsUUID()
  @IsNotEmpty()
  public churchId: string;

  @IsString()
  @IsNotEmpty()
  public churchName: string;

  @IsOptional()
  public responsible: boolean;
}
