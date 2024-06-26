import { AllExceptionFilter } from './common/filter';
import { AppConfig } from '@app/app.config';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ResponseInterceptor, useRequestLogging } from './common';
import { clusterize } from './utils';
import helmet from 'helmet';

const { CLUSTERING } = process.env;

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    AppConfig.getFastifyInstance()
  );

  const configService = app.get(ConfigService);

  const BASE_PATH = configService.get('BASE_PATH');
  const NODE_ENV = configService.get('NODE_ENV');
  const PORT = configService.get('PORT');

  const HOST = NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';

  app.enableVersioning();
  app.enableCors();
  app.use(helmet());

  useRequestLogging(app);

  app.setGlobalPrefix(BASE_PATH);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT, HOST, () => {
    Logger.log(`Listening at Port ${PORT}`, bootstrap.name);
  });
};

if (CLUSTERING === 'true') clusterize(bootstrap);
else bootstrap();
