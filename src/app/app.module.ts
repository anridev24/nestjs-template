import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot(AppConfig.getInitConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}