import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

import { SecurityAuthProvider } from '@app/security';

import { AuthService } from './auth.service';
import { CredentialDto } from './dtos/credential.dto';

@Injectable()
export class AuthProvider implements SecurityAuthProvider<CredentialDto> {
  constructor(private readonly authService: AuthService) {}

  credential(token: string): Observable<CredentialDto> {
    const data = this.authService.getUserInfo(token);
    return from(data);
  }
}
