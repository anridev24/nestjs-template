import { AppService } from './app.service';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { ErrorResponse, SuccessResponse } from '@/utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health/:returnError')
  async health(@Param() param: { returnError: string }) {
    try {
      await this.appService.example(
        String(param.returnError).toLowerCase() === 'true'
      );

      return new SuccessResponse('ok', { test: '1' });
    } catch (error: unknown) {
      if (error instanceof ErrorResponse) return error;
      throw new InternalServerErrorException(error);
    }
  }
}
