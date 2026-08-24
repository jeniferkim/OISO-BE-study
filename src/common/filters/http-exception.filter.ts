import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch() // 아무 예외 타입을 지정 X -> 모든 예외 받음. 모두 Filter로 들어옴
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? this.getMessage(exception)
        : '서버 내부 오류가 발생했습니다.';

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private getMessage(exception: HttpException): string | string[] {
    const response = exception.getResponse();

    if (typeof response === 'string') {
      return response;
    }

    if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response
    ) {
      const message = response.message;

      if (typeof message === 'string') {
        return message;
      }

      if (
        Array.isArray(message) &&
        message.every((item) => typeof item === 'string')
      ) {
        return message;
      }
    }

    return exception.message;
  }
}
