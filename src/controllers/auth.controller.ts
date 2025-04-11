import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto, AuthService, CredentialDto } from '@app/auth';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public login(@Body() authDto: AuthDto): Promise<CredentialDto> {
    return this.authService.login(authDto);
  }

  @Post('/refresh')
  public refresh(@Req() req: Request): Promise<CredentialDto> {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido ou malformado.');
    }

    const token = authHeader.replace('Bearer ', '').trim();

    return this.authService.refresh(token);
  }
}
