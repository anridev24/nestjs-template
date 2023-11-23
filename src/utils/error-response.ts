import { HttpException } from '@nestjs/common';

export class ErrorResponse extends HttpException {
  constructor(statusCode: number, message: string, error?: any) {
    super(
      {
        message,
        statusCode,
        error,
      },
      statusCode
    );

    throw this;
  }
}
