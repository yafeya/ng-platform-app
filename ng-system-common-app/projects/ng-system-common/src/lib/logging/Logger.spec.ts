import { TestBed, async } from '@angular/core/testing';
import { Logger } from './Logger';
import { DefaultLoggerFactory } from './DefaultLoggerFactory';
import { ILoggerProvider } from './ILoggerProvider';
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
import { LoggerBase } from './LoggerBase';
import './LoggerFactoryExtensions';

export class MockLogger extends LoggerBase {
    Log(level: LogLevel, eventId: number, state: any, error: Error, formatter: (any, Error) => string) {
        console.log(state);
    }
}
export class MockLoggerProvider implements ILoggerProvider {
    /** Create a new logger instance */
    CreateLogger(categoryName: string): ILogger {
        return new MockLogger();
    }

    Dispose(): void {

    }
}

describe('Logger', () => {
    let logger: Logger;

    beforeEach(async(() => {
        let factory = new DefaultLoggerFactory();
        //let provider = new MockLoggerProvider();
        //factory.AddProvider(provider);
        factory.AddDebug();
        logger = new Logger(factory, 'test');
    }));

    it(`debug message`, async(() => {
        logger.Debug('test message to debug');
    }));
    it(`trace message`, async(() => {
        logger.Debug('test message to trace');
    }));
    it(`info message`, async(() => {
        logger.Debug('test message to info');
    }));
    it(`warn message`, async(() => {
        logger.Debug('test message to warn');
    }));
    it(`error message`, async(() => {
        logger.Debug('test message to error');
    }));
    it(`fatal message`, async(() => {
        logger.Debug('test message to fatal');
    }));
});