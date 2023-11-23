export class SuccessResponse<T> {
  constructor(message: string, data?: T) {
    return {
      message: message || 'default message',
      data: data || undefined,
    };
  }
}
