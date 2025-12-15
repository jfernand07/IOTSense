import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface ApiSuccessResponse<T> {
    success: true;
    statusCode: number;
    timestamp: string;
    path: string;
    data: T;
}
export declare class ResponseInterceptor<T> implements NestInterceptor<T, ApiSuccessResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiSuccessResponse<T>>;
}
