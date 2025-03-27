import { Dto } from '@app/commons';

export class UserRecoveredDto extends Dto {
  public id: string;

  public name: string;

  public email: string;

  public url: string;
}
