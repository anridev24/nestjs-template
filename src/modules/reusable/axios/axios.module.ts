import { AxiosService } from './axios.service';
import { Module } from '@nestjs/common';
import axios from 'axios';

export const AXIOS_INSTANCE_TOKEN = 'AXIOS_INSTANCE_TOKEN';

@Module({
  providers: [AxiosService, { provide: AXIOS_INSTANCE_TOKEN, useValue: axios }],
  exports: [AxiosService],
})
export class AxiosModule {}
