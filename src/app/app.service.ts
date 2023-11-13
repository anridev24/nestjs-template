import { AxiosInstance } from 'axios';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('instagramClient')
    private readonly appClient: AxiosInstance
  ) {}

  async example() {
    this.appClient.get('https://api.instagram.com/v1');
  }
}
