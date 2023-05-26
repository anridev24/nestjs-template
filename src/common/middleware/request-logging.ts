import { INestApplication } from '@nestjs/common/interfaces';
import { LogLevel } from '@/types';
import { Logger } from '@nestjs/common';
import morgan from 'morgan';

export function useRequestLogging(app: INestApplication, logLevel: LogLevel) {
  const logger = new Logger('Request');
  app.use(
    morgan(logLevel, {
      stream: {
        write: (message) => logger.log(message.replace('\n', '')),
      },
    })
  );
}
