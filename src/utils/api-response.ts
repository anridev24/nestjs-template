export class APIResponse<T> {
  constructor(message: string, data?: T, status?: number, error?: any) {
    return {
      message: message || '',
      data: data || undefined,
      status: status || 200,
      error: error || undefined,
    };
  }
}
