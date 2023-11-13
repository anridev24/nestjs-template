import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxiosModule, AxiosService } from '@/modules/reusable';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

const appClient = {
  provide: 'instagramClient',
  useFactory: (axiosService: AxiosService) => {
    return axiosService.create({
      baseURL: `https://api.instagram.com/v1`, // example
    });
  },
  inject: [AxiosService],
};

@Module({
  imports: [ConfigModule.forRoot(AppConfig.getInitConfig()), AxiosModule],
  controllers: [AppController],
  providers: [AppService, appClient],
})
export class AppModule {}
