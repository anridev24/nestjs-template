import { ErrorResponse } from './error-response';
import { InternalServerErrorException } from '@nestjs/common';

export class UnhandledResponse {
  constructor(error: unknown) {
    if (error instanceof ErrorResponse) return error.getResponse();
    throw new InternalServerErrorException(error);
  }
}
