import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { In } from 'typeorm';

import { ExceptionCode } from 'messages';
import { BusinessException, DefaultResponse, validate } from '@app/commons';

import { UserDto } from './dtos/user.dto';
import { User, UserStatus } from './user.entity';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserCreatedDto } from './dtos/user-created.dto';
import { UserRecoveryDto } from './dtos/user-recovery.dto';
import { UserRecoveredDto } from './dtos/user-recovered.dto';
import { UserActivationDto } from './dtos/user-activation.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly userRepository: UserRepository,
  ) {}

  public async create(userDto: UserCreateDto): Promise<DefaultResponse> {
    await validate(userDto);

    const count = await this.userRepository.count({
      where: {
        email: userDto.email,
        status: In([UserStatus.ACTIVE, UserStatus.PENDING]),
      },
    });

    if (count !== 0) {
      throw new BusinessException(ExceptionCode.USER_003);
    }

    const activationCode = uuid().replaceAll('-', '');

    const user = User.newInstance({
      activationCode,
      name: userDto.name,
      email: userDto.email,
      status: UserStatus.PENDING,
    });

    const data = await this.userRepository.save(user);

    this.eventEmitter.emitAsync(
      'user.activate',
      UserCreatedDto.newInstance({
        id: data.id,
        name: data.name,
        email: data.email,
        url: `${process.env.APP_WEB_URL}/acesso/${data.activationCode}/senha/ativacao`,
      }),
    );

    return { id: data.id };
  }

  public async validateActivationCode(code: string): Promise<true> {
    const valid =
      (await this.userRepository.count({ where: { activationCode: code } })) !==
      0;

    if (!valid) {
      throw new BusinessException(ExceptionCode.USER_001);
    }

    return valid;
  }

  public async activate(activationDto: UserActivationDto): Promise<void> {
    validate(activationDto);

    const user = await this.userRepository.findOne({
      where: { activationCode: activationDto.activationCode },
    });

    if (!user) {
      throw new BusinessException(ExceptionCode.USER_001);
    }

    user.password = await this.encryptPassword(activationDto.password);
    user.status = UserStatus.ACTIVE;
    user.updatedAt = new Date();
    user.activationCode = null;

    await this.userRepository.save(user);
  }

  public async validateRecoveryCode(code: string): Promise<true> {
    const valid =
      (await this.userRepository.count({ where: { recoveryCode: code } })) !==
      0;

    if (!valid) {
      throw new BusinessException(ExceptionCode.USER_001);
    }

    return valid;
  }

  public async requestRecovery(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user?.id) {
      throw new BusinessException(ExceptionCode.USER_002);
    }

    user.recoveryCode = uuid().replaceAll('-', '');
    const data = await this.userRepository.save(user);

    this.eventEmitter.emitAsync(
      'user.recovery',
      UserRecoveredDto.newInstance({
        id: data.id,
        name: data.name,
        email: data.email,
        url: `${process.env.APP_WEB_URL}/acesso/${user.recoveryCode}/senha/recuperacao`,
      }),
    );
  }

  public async recover(recoveryDto: UserRecoveryDto): Promise<void> {
    validate(recoveryDto);

    const user = await this.userRepository.findOne({
      where: { recoveryCode: recoveryDto.recoveryCode },
    });

    if (!user) {
      throw new BusinessException(ExceptionCode.USER_001);
    }

    user.password = await this.encryptPassword(recoveryDto.password);
    user.updatedAt = new Date();
    user.recoveryCode = null;

    await this.userRepository.save(user);
  }

  public async findActiveByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({
      email,
      status: UserStatus.ACTIVE,
    });

    return user?.id && UserDto.newInstance(user);
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
