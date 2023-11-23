import { AppService } from './app.service';
import { Controller, Get, Param } from '@nestjs/common';
import { SuccessResponse } from '@/utils';
import { UnhandledResponse } from '@/utils/unhandled-response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test/:returnError')
  async test(@Param() param: { returnError: string }) {
    try {
      const shouldThrow = String(param.returnError).toLowerCase() === 'true';

      // if (shouldThrow) throw new ErrorResponse(401, 'error test', { b: 1 });
      await this.appService.example(shouldThrow);

      return new SuccessResponse('ok', { test: '1' });
    } catch (error: unknown) {
      // if (error instanceof ErrorResponse) throw error;
      return new UnhandledResponse(error);
      // if (error instanceof InternalServerErrorException)
      //   throw new InternalServerErrorException(error.getResponse());
      // throw error;
    }
  }
}
