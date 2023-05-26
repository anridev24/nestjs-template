import { ErrorResponse, SuccessResponse } from '@/types';

export class APIResponse {
  constructor(message: string, status: number, data?: object, error?: object) {
    const response: SuccessResponse | ErrorResponse = {
      statusCode: status || 200,
      message: message || '',
      timestamp: new Date().toISOString(),
      data: data || undefined,
      error: error || undefined,
    };
    return response;
  }
}
