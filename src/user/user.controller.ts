import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { DefaultResponse } from 'src/commons/default-response';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() userDto: UserCreateDto): Promise<DefaultResponse> {
    return this.userService.create(userDto);
  }
}
