import { Global, Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthProvider } from './auth.provider';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

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
  controllers: [AuthController],
  exports: [AuthService, AuthProvider, 'AUTH_PROVIDER'],
})
export class AuthModule {}
