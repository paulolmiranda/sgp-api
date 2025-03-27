import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';
import { Dto } from '@app/commons';

export class AuthDto extends Dto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  public password: string;
}
