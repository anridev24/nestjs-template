import { INestApplication } from '@nestjs/common/interfaces';
import { Logger } from '@nestjs/common';
import morgan from 'morgan';

export function useRequestLogging(app: INestApplication) {
  const logger = new Logger('Request');
  app.use(
    morgan('dev', {
      stream: {
        write: (message) => logger.log(message.replace('\n', '')),
      },
    })
  );
}
