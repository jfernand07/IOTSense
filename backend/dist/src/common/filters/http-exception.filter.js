"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    logger = new common_1.Logger(HttpExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = exception instanceof common_1.HttpException ? exception.getResponse() : null;
        const errorPayload = exceptionResponse && typeof exceptionResponse === 'object' ? exceptionResponse : { message: exceptionResponse };
        const messages = Array.isArray(errorPayload?.message) ? errorPayload.message : undefined;
        const message = errorPayload?.message && !Array.isArray(errorPayload?.message)
            ? errorPayload.message
            : (messages?.join(', ') ?? 'Internal server error');
        const formatted = {
            success: false,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
            error: errorPayload?.error,
            details: messages,
        };
        if (!(exception instanceof common_1.HttpException)) {
            this.logger.error(`Unhandled exception on ${request.method} ${request.url}`, exception?.stack);
        }
        response.status(status).json(formatted);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map