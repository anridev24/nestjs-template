import { AppService } from './app.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ErrorResponse, SuccessResponse } from '@/utils';
import { UnhandledResponse } from '@/utils/unhandled-response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test/:returnError')
  async test(@Param() param: { returnError: string }) {
    try {
      const shouldThrow = String(param.returnError).toLowerCase() === 'true';

      await this.appService.example(shouldThrow);

      if (shouldThrow) throw new ErrorResponse(401, 'error test', { b: 1 });

      return new SuccessResponse('ok', { test: '1' });
    } catch (error: unknown) {
      return new UnhandledResponse(error);
    }
  }
}
