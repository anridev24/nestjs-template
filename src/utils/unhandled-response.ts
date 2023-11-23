import { HttpException, InternalServerErrorException } from '@nestjs/common';

export class UnhandledResponse {
  constructor(error: unknown) {
    if (error instanceof InternalServerErrorException)
      throw new InternalServerErrorException(error.getResponse());

    if (error instanceof HttpException) throw error;

    if (error instanceof Error)
      throw new InternalServerErrorException(error.message);
    console.error('bug in code', error);
    process.exit(1);
    throw error;
  }
}
