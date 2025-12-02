import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class FiltersFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
