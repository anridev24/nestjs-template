import { AxiosInstance } from 'axios';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('instagramClient')
    private readonly appClient: AxiosInstance
  ) {}

  async example(returnError: boolean) {
    // if (returnError) throw new ErrorResponse(401, 'error test', { b: 1 });
    // throw new InternalServerErrorException('test');
    // throw new BadRequestException('test');
    throw TypeError('im error');

    return true;
  }
}
