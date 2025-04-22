import { IsEmail, IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Dto } from 'src/commons/dto';

export class UserCreateDto extends Dto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  public email: string;
}
