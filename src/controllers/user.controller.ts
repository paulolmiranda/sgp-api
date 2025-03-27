import { Body, Controller, Post } from '@nestjs/common';

import { DefaultResponse } from '@app/commons';
import { UserCreateDto, UserService } from '@app/user';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() userDto: UserCreateDto): Promise<DefaultResponse> {
    return this.userService.create(userDto);
  }
}
