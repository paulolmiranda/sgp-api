import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Observable } from 'rxjs';

export interface Credential {
  valid: boolean;
}

export interface SecurityAuthProvider<T extends Credential> {
  credential(token: string): Observable<T>;
}

export const InstanceCredential = createParamDecorator(
  <T>(_: undefined, context: ExecutionContext): T | undefined => {
    return context.switchToHttp().getRequest().credential as T;
  },
);
