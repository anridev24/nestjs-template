import { APIResponse } from '@/utils';
import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return new APIResponse('Healthy!', undefined, 200);
  }
}
