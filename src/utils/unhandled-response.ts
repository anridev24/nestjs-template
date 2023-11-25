import { HttpException, InternalServerErrorException } from '@nestjs/common';

// Was Replaced by all-exception.filter.ts
// still here for reference
export class UnhandledResponse {
  constructor(error: unknown) {
    if (error instanceof InternalServerErrorException)
      throw new InternalServerErrorException(error.getResponse());

    if (error instanceof HttpException) throw error;

    if (error instanceof Error)
      throw new InternalServerErrorException(error.message);

    throw error;
  }
}
