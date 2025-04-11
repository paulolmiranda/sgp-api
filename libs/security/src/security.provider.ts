import { User } from '@app/user';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Observable } from 'rxjs';

export interface Credential {
  user: User;
  valid: boolean;
}

export interface SecurityAuthProvider<T extends Credential> {
  credential(token: string): Observable<T>;
}

export const InstanceCredential = createParamDecorator(
  <T>(_: undefined, context: ExecutionContext): T => {
    return context.switchToHttp().getRequest().credential as T;
  },
);
