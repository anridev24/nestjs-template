import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionFilter.name);

  catch(error: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // catch errors only in development
    if (
      error instanceof Error &&
      !(error instanceof HttpException) &&
      process.env.NODE_ENV !== 'production'
    ) {
      this.logger.warn('Error');
      this.logger.error(error.message, error.stack);

      return response.status(status).send({
        statusCode: status,
        message: error.message,
        error: error.stack,
      });
    }

    // catch errors only in production
    if (error instanceof InternalServerErrorException) {
      const errorResponse = error.getResponse();
      this.logger.warn('Internal Server Error');
      this.logger.error(JSON.stringify(errorResponse, null, 2));
      return response.status(status).send(errorResponse);
    }

    // catch http errors
    if (error instanceof HttpException) {
      const errorResponse = error.getResponse();
      this.logger.warn('Http Exception');
      this.logger.error(JSON.stringify(errorResponse, null, 2));
      return response.status(status).send(errorResponse);
    }

    // catch anything that is not caught by previous filters
    this.logger.error('bug in code', error);
    return response.status(500).send({
      statusCode: status,
      message: 'Unhandled Error',
      error,
    });
  }
}
