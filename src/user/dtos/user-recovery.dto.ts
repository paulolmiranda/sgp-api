import {
  Matches,
  IsString,
  Validate,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

import { Dto } from 'src/commons/dto';
import { MatchValidator } from 'src/commons/validators/match.validator';

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
