import { Expose } from 'class-transformer';
import { User } from '@app/user';
import { Dto } from '@app/commons';
import { Credential } from '@app/security';

export class CredentialDto extends Dto implements Credential {
  public id: string;

  public name: string;

  public email: string;

  public expiresIn: number;

  public accessToken: string;

  public refreshToken: string;

  public user: User;

  @Expose()
  public get valid(): boolean {
    return !!this.id;
  }
}
