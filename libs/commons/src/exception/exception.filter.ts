import {
  Catch,
  Logger,
  Inject,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

import { ExceptionOptions } from './exception-options';
import { BusinessException } from './business.exception';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter<Error> {
  private readonly logger = new Logger('ExceptionsHandler');

  constructor(
    @Inject('EXCEPTION_OPTIONS') private readonly options: ExceptionOptions,
  ) {
    super();
  }

  catch(exception: Error, host: ArgumentsHost) {
    console.log(exception);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    /** class-validator */
    if (
      exception instanceof BadRequestException &&
      Array.isArray(exception.getResponse()['message'])
    ) {
      return this.handleClassValidator(exception, response);
    }

    /** Nestjs */
    if (exception instanceof HttpException) {
      return super.catch(exception, host);
    }

    /** Business */
    if (exception instanceof BusinessException) {
      return this.handleBusinessException(exception, response);
    }

    /** Error */
    return this.handleError(exception, response);
  }

  private handleClassValidator(
    exception: BadRequestException,
    response: Response,
  ): void {
    const { classValidatorCode, messages } = this.options;
    const data = messages[`${classValidatorCode}`] || {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `${classValidatorCode}`,
    };

    const body = {
      statusCode: data.status,
      code: classValidatorCode,
      message: data.message,
      properties: exception.getResponse()['message'],
    };

    response.status(data.status).json(body);
    this.logger.error(body.message, exception.stack);
  }

  private handleBusinessException(
    exception: BusinessException,
    response: Response,
  ): void {
    const data = this.options.messages[`${exception.code}`] || {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `${exception.code}`,
    };

    const body = {
      statusCode: data.status,
      code: exception.code,
      message: data.message,
    };

    response.status(data.status).json(body);
    this.logger.error(body.message, exception.stack);
  }

  private handleError(exception: Error, response: Response): void {
    const { internalServerErrorCode, messages } = this.options;
    const data = messages[`${internalServerErrorCode}`] || {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `${internalServerErrorCode}`,
    };

    const body = {
      statusCode: data.status,
      code: internalServerErrorCode,
      message: data.message.replace(':stack', exception.message),
    };

    response.status(data.status).json(body);
    this.logger.error(body.message, exception.stack);
  }
}
