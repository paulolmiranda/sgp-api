import { HttpStatus } from '@nestjs/common';

export declare interface ExceptionMessages {
  [code: string]: {
    status: HttpStatus;
    message: string;
  };
}
