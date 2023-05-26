import { AppConfig } from '@app/app.config';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { clusterize } from './utils';
import { useRequestLogging } from './common';
import helmet from 'helmet';

const { CLUSTERING, PORT } = process.env;

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    AppConfig.getFastifyInstance()
  );

  const configService = app.get(ConfigService);

  const BASE_PATH = configService.get('BASE_PATH');
  const NODE_ENV = configService.get('NODE_ENV');
  const LOG_LEVEL = configService.get('LOG_LEVEL');

  app.enableVersioning();
  app.enableCors();

  app.use(helmet());
  useRequestLogging(app, LOG_LEVEL);

  app.setGlobalPrefix(BASE_PATH);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT, () => {
    Logger.log(`Listening at Port ${PORT}`, bootstrap.name);
  });
};

if (CLUSTERING === 'true') clusterize(bootstrap);
else bootstrap();
