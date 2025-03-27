import { Global, Module } from '@nestjs/common';

import { UserModule } from '@app/user';

import { AuthService } from './auth.service';
import { AuthProvider } from './auth.provider';

@Global()
@Module({
  providers: [
    AuthService,
    AuthProvider,
    {
      provide: 'AUTH_PROVIDER',
      useExisting: AuthProvider,
    },
  ],
  imports: [UserModule],
  exports: [AuthService, AuthProvider, 'AUTH_PROVIDER'],
})
export class AuthModule {}
