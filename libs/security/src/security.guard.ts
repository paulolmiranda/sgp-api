import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { SecurityAuthProvider, Credential } from './security.provider';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    @Inject('AUTH_PROVIDER')
    private readonly authProvider: SecurityAuthProvider<Credential>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const { authorization = '' } = headers;

    const bearerToken = authorization.trim();

    if (!bearerToken.startsWith('Bearer')) {
      throw new UnauthorizedException();
    }

    const token = bearerToken.replace('Bearer', '').trim();
    const source = this.authProvider.credential(token);
    const credential = await lastValueFrom(source);

    if (!credential?.valid) {
      throw new UnauthorizedException();
    }

    context.switchToHttp().getRequest().credential = credential;
    return true;
  }
}
