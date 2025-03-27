import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Dto, MatchValidator } from '@app/commons';

export class UserRecoveryDto extends Dto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  public password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Validate(MatchValidator, ['password'])
  public passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  public recoveryCode: string;
}
