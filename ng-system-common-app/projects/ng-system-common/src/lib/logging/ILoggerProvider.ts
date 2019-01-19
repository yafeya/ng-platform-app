import { ILogger } from './ILogger';
import { IDisposable } from '../common/IDisposable';

export interface ILoggerProvider extends IDisposable {
    /** Create a new logger instance */
    CreateLogger(categoryName: string): ILogger;
}