import { Module } from '@nestjs/common';

import { UserEmailListener } from './user.listener';

@Module({
  imports: [],
  providers: [UserEmailListener],
  exports: [],
})
export class EmailModule {}
