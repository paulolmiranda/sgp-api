import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

import { UserCreatedDto, UserRecoveredDto } from '@app/user';

@Injectable()
export class UserEmailListener {
  constructor() {}

  @OnEvent('user.activate')
  public handleUserActivateEvent(event: UserCreatedDto): Promise<void> {
    console.log('user.activate', event);
    return null;
  }

  @OnEvent('user.invite')
  public handleUserInviteEvent(event: UserCreatedDto): Promise<void> {
    console.log('user.invite', event);
    return null;
  }

  @OnEvent('user.recovery')
  public handleUserRecoveryEvent(event: UserRecoveredDto): Promise<void> {
    console.log('user.recovery', event);
    return null;
  }
}
