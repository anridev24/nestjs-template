import { ConfigModuleOptions } from '@nestjs/config';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { LogLevel, NodeEnv } from '@/types';

import Joi from 'joi';

export class AppConfig {
  public static getFastifyInstance(): FastifyAdapter {
    return new FastifyAdapter();
  }

  public static getInitConfig(): ConfigModuleOptions {
    const validNodeEnvList = Object.keys(NodeEnv).map((key) => NodeEnv[key]);
    const validLogLevelList = Object.keys(LogLevel).map((key) => LogLevel[key]);

    const envPath =
      process.env.NODE_ENV === NodeEnv.DEVELOPMENT
        ? '.env.development'
        : '.env.production';

    return {
      envFilePath: envPath,
      isGlobal: true,
      validationSchema: Joi.object({
        BASE_PATH: Joi.string().allow('').optional(),
        PORT: Joi.number().min(1).max(65535).required(),
        CLUSTERING: Joi.boolean().required(),
        LOG_LEVEL: Joi.string()
          .valid(...validLogLevelList)
          .required(),
        NODE_ENV: Joi.string()
          .valid(...validNodeEnvList)
          .required(),
      }),
    };
  }
}
