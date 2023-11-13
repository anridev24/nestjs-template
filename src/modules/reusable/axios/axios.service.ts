import { Injectable } from '@nestjs/common';
import axios, { CreateAxiosDefaults } from 'axios';

@Injectable()
export class AxiosService {
  create(options: CreateAxiosDefaults<any>) {
    return axios.create(options);
  }
}
