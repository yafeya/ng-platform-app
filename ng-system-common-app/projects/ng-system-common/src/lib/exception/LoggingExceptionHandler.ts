import { Injectable, Inject } from '@angular/core';
import * as Logging from '../logging/index';
import { IExceptionHandler } from './IExceptionHandler';
import { LoggerFactoryToken } from '../Tokens';

@Injectable()
export class LoggingExceptionHandler implements IExceptionHandler {
    private logger: Logging.ILogger;

    constructor(@Inject(LoggerFactoryToken) private loggerFactory: Logging.ILoggerFactory) {
        this.logger = loggerFactory.CreateLogger('ExceptionHandler');
    }

    Handle(exception: Error): void {
        this.logger.Error(exception);
    }
}