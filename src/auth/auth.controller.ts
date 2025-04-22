import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { CredentialDto } from './dtos/credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public login(@Body() authDto: AuthDto): Promise<CredentialDto> {
    return this.authService.login(authDto);
  }

  @Get('/refresh')
  public refresh(@Query('token') token: string): Promise<CredentialDto> {
    return this.authService.refresh(token);
  }
}
