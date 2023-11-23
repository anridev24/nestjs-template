import { AxiosInstance } from 'axios';
import { ErrorResponse } from '@/utils';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('instagramClient')
    private readonly appClient: AxiosInstance
  ) {}

  async example(returnError: boolean) {
    // throw new BadRequestException('test');
    if (returnError) throw new ErrorResponse(401, 'error test', { b: 1 });
    return true;
  }
}
