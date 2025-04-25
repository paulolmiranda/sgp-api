import { Exclude } from 'class-transformer';
import { Dto } from 'src/commons/dto';

export class UserDto extends Dto {
  public id: string;

  public name: string;

  public email: string;

  @Exclude()
  public password?: string;
}
