import { Controller, Get, Put, Body, Param, Patch } from '@nestjs/common';

import { UserActivationDto, UserRecoveryDto, UserService } from '@app/user';

@Controller('users-access')
export class UserAccessController {
  constructor(private readonly userService: UserService) {}

  @Put('/activation')
  public activate(@Body() activationDto: UserActivationDto): Promise<void> {
    return this.userService.activate(activationDto);
  }

  @Get('/activation/valid/:code')
  public async validateActivationCode(
    @Param('code') code: string,
  ): Promise<void> {
    await this.userService.validateActivationCode(code);
  }

  @Put('/recovery')
  public recover(@Body() recoveryDto: UserRecoveryDto): Promise<void> {
    return this.userService.recover(recoveryDto);
  }

  @Get('/recovery/valid/:code')
  public async validateRecoveryCode(
    @Param('code') code: string,
  ): Promise<void> {
    await this.userService.validateRecoveryCode(code);
  }

  @Patch('/recovery/email/:email')
  public requestRecovery(@Param('email') email: string): Promise<void> {
    return this.userService.requestRecovery(email);
  }
}
