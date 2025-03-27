import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ExceptionFilter } from './exception.filter';
import { ExceptionOptions } from './exception-options';

@Module({})
export class ExceptionModule {
  static forRoot(options: ExceptionOptions): DynamicModule {
    return {
      module: ExceptionModule,
      providers: [
        {
          provide: APP_FILTER,
          useClass: ExceptionFilter,
        },
        {
          provide: 'EXCEPTION_OPTIONS',
          useValue: options,
        },
      ],
      exports: ['EXCEPTION_OPTIONS'],
    };
  }
}
