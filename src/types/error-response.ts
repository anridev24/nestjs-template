export interface ErrorResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  error: object | string | null;
}
