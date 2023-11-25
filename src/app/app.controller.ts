import { AppService } from './app.service';
import { Controller, Get, Param } from '@nestjs/common';
import { SuccessResponse } from '@/utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test/:returnError')
  async test(@Param() param: { returnError: string }) {
    const shouldThrow = String(param.returnError).toLowerCase() === 'true';

    await this.appService.example(shouldThrow);

    return new SuccessResponse('ok', { test: '1' });
  }
}
