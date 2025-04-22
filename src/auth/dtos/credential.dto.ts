import { Expose } from 'class-transformer';

import { Dto } from 'src/commons/dto';
import { Credential } from 'src/security/security.provider';

export class CredentialDto extends Dto implements Credential {
  public id: string;

  public name: string;

  public email: string;

  public expiresIn: number;

  public accessToken: string;

  public refreshToken: string;

  @Expose()
  public get valid(): boolean {
    return !!this.id;
  }
}
