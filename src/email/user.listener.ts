import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

import { UserCreatedDto } from 'src/user/dtos/user-created.dto';
import { UserRecoveredDto } from 'src/user/dtos/user-recovered.dto';

@Injectable()
export class UserEmailListener {
  constructor() {}

  @OnEvent('user.activate')
  public handleUserActivateEvent(event: UserCreatedDto): Promise<void> {
    console.log('user.activate', event);
    return Promise.resolve();
  }

  @OnEvent('user.invite')
  public handleUserInviteEvent(event: UserCreatedDto): Promise<void> {
    console.log('user.invite', event);
    return Promise.resolve();
  }

  @OnEvent('user.recovery')
  public handleUserRecoveryEvent(event: UserRecoveredDto): Promise<void> {
    console.log('user.recovery', event);
    return Promise.resolve();
  }
}
