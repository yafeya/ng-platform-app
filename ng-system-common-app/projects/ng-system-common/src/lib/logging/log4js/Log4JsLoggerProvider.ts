import { ILoggerProvider } from '../ILoggerProvider';
import { ILogger } from '../ILogger';
import { LogLevel } from '../LogLevel';
import { Log4JsLogger } from './Log4JsLogger';
import * as IO from '../../io/index';

declare var log4js: any;
declare var electron: any;

export class Log4JsLoggerProvider implements ILoggerProvider {

    constructor(initializer?: () => void, logFileName = 'log.txt') {

        if (initializer) {
            initializer();
        } else {
            try {
                let directory = new IO.Directory();
                let folder = directory.GetUserDataFolder();
                directory.EnsureFolderExist(folder);
                let file = directory.Combine(folder, logFileName);

                log4js.configure({
                    appenders: {
                        file: { type: 'file', filename: file, maxLogSize: 20480, backups: 2 },
                        console: { type: 'console', }
                    },
                    categories: {
                        default: { appenders: ['console', 'file'], level: 'debug' }
                    }
                });
            } catch (e) {
                console.log('Not Electron runtime, initialize Log4JS failed.');
            }

        }
    }

    /**
     * Create logger 
     * @param name logger name
     */
    CreateLogger(name: string): ILogger {
        let loggerName = name ? name : 'Default';
        let log4Logger = log4js.getLogger(loggerName);

        return new Log4JsLogger(loggerName, log4Logger);
    }

    Dispose(): void {

    }
}