import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

interface ApiErrorResponse {
  success: false;
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  error?: string;
  details?: string[];
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : null;

    const errorPayload =
      exceptionResponse && typeof exceptionResponse === 'object' ? exceptionResponse : { message: exceptionResponse };

    const messages = Array.isArray((errorPayload as any)?.message) ? (errorPayload as any).message : undefined;

    const message =
      (errorPayload as any)?.message && !Array.isArray((errorPayload as any)?.message)
        ? (errorPayload as any).message
        : (messages?.join(', ') ?? 'Internal server error');

    const formatted: ApiErrorResponse = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      error: (errorPayload as any)?.error,
      details: messages,
    };

    if (!(exception instanceof HttpException)) {
      this.logger.error(`Unhandled exception on ${request.method} ${request.url}`, (exception as Error)?.stack);
    }

    response.status(status).json(formatted);
  }
}
