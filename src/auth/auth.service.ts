import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

import { AuthDto } from './dtos/auth.dto';
import { UserService } from 'src/user/user.service';
import { CredentialDto } from './dtos/credential.dto';
import { JwtBuilder, JwtTokenType } from './jwt.builder';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async login(authDto: AuthDto): Promise<CredentialDto> {
    const userDto = await this.userService.findActiveByEmail(authDto.email);

    if (!userDto?.id) {
      throw new HttpException(
        'Usuário ou senha incorreta. Tente novamente.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const valid = await bcrypt.compare(
      authDto.password,
      userDto.password || '',
    );

    if (!valid) {
      throw new HttpException(
        'Usuário ou senha incorreta. Tente novamente.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const credentialDto = CredentialDto.newInstance({
      id: userDto.id,
      name: userDto.name,
      email: userDto.email,
    });

    const jwt = JwtBuilder.newInstance<CredentialDto>(credentialDto).builde();
    credentialDto.refreshToken = jwt.refreshToken;
    credentialDto.accessToken = jwt.accessToken;
    credentialDto.expiresIn = jwt.expiresIn;
    return credentialDto;
  }

  public async refresh(token: string): Promise<CredentialDto> {
    const payload = await lastValueFrom(
      JwtBuilder.decoded<CredentialDto>(token, JwtTokenType.Refresh),
    );

    if (!payload) {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }

    const credentialDto = CredentialDto.newInstance({
      id: payload.id,
      name: payload.name,
      email: payload.email,
    });

    const jwt = JwtBuilder.newInstance<CredentialDto>(credentialDto).builde();
    credentialDto.refreshToken = jwt.refreshToken;
    credentialDto.accessToken = jwt.accessToken;
    credentialDto.expiresIn = jwt.expiresIn;

    return credentialDto;
  }

  public async getUserInfo(token: string): Promise<CredentialDto> {
    const payload = await lastValueFrom(
      JwtBuilder.decoded<CredentialDto>(token, JwtTokenType.Access),
    );

    let credentialDto = CredentialDto.newInstance({});

    if (payload) {
      credentialDto = CredentialDto.newInstance({ ...payload });
    }

    return credentialDto;
  }
}
