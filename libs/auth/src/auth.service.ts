import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

import { UserService } from '@app/user';
import { ExceptionCode } from 'messages';
import { BusinessException } from '@app/commons';

import { AuthDto } from './dtos/auth.dto';
import { CredentialDto } from './dtos/credential.dto';
import { JwtBuilder, JwtTokenType } from './jwt.builder';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async login(authDto: AuthDto): Promise<CredentialDto> {
    const userDto = await this.userService.findActiveByEmail(authDto.email);

    if (!userDto?.id) {
      throw new BusinessException(ExceptionCode.AUTH_002);
    }

    const valid = await bcrypt.compare(authDto.password, userDto.password);

    if (!valid) {
      throw new BusinessException(ExceptionCode.AUTH_002);
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
      throw new BusinessException(ExceptionCode.AUTH_001);
    }

    const credentialDto = CredentialDto.newInstance({ ...payload });

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
    let credentialDto: CredentialDto;

    if (payload) {
      credentialDto = CredentialDto.newInstance({ ...payload });
    }

    return credentialDto;
  }
}
