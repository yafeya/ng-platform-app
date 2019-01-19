
import { LoggerBase } from '../LoggerBase';
import { LogLevel } from '../LogLevel';

export class DebugLogger extends LoggerBase {

    constructor(name: string, private filter: (message: string, levle: LogLevel) => boolean) {
        super();
        this.Name = name;
    }

    /**
     * Peform log output to console
     * @param level 
     * @param eventId 
     * @param state 
     * @param error 
     * @param formatter 
     */
    Log(level: LogLevel, eventId: number, state: any, error: Error, formatter: (any, Error) => string) {
        console.log(`[${new Date().toLocaleTimeString()}] ${this.Name}: ${level}, ${this.formatter(state, error)}`);
    }
}