import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from '@/types/utils';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response> {
  private logger = new Logger(ResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    try {
      return next.handle().pipe(
        map((data: Response) => {
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: data.message,
            data: data.data,
            error: data.error,
          };
        })
      );
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        { message: 'unknown_error', internalError: error },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
