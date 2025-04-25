import {
  Catch,
  Logger,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter<Error> {
  private readonly logger = new Logger('ExceptionsHandler');

  catch(exception: Error, host: ArgumentsHost) {
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

    /** Error */
    return this.handleError(exception, response);
  }

  private handleClassValidator(
    exception: BadRequestException,
    response: Response,
  ): void {
    const body = {
      message: exception.message,
      statusCode: exception.getStatus(),
      properties: exception.getResponse()['message'],
    };

    response.status(exception.getStatus()).json(body);
    this.logger.error(body.message, exception.stack);
  }

  private handleError(exception: Error, response: Response): void {
    const body = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `A aplicação encontrou um erro inesperado. Favor contactar o Administrador. Descrição do erro: ${exception.message}`,
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
    this.logger.error(body.message, exception.stack);
  }
}
