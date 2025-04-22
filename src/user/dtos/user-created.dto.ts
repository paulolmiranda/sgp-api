import { Dto } from 'src/commons/dto';

export class UserCreatedDto extends Dto {
  public id: string;

  public name: string;

  public email: string;

  public url: string;
}
