import { IDictionary, Dictionary,  } from '../collections/index';
import { InjectionToken } from '@angular/core';

export interface ISize {
    Width: number;
    Height: number;
}
export interface ISizChangeHandler {
    Handle(size: ISize): void;
}
export interface IWindowSizeWatcher {
    Start(): void;
    Add(name: string, handler: ISizChangeHandler);
    Remove(name: string);
}
export const WindowSizeWatcherToken = new InjectionToken('./IWindowSizeWatcher');

export class WindowSizeWatcher implements IWindowSizeWatcher {
    private handlers: IDictionary<string, ISizChangeHandler>;


    constructor() {
        this.handlers = new Dictionary<string, ISizChangeHandler>();
    }

    Start(): void {

        let self = this;
        window.onresize = (e: UIEvent) => {
            for (let handler of self.handlers.Values()) {
                handler.Handle({ Width: window.innerWidth, Height: window.innerHeight });
            }
        };
    }

    Add(name: string, handler: ISizChangeHandler): void {
        this.handlers.Add(name, handler);
    }
    Remove(name: string) {
        this.handlers.Remove(name);
    }

    private OnSizeChanged(e: UIEvent) {

        for (let handler of this.handlers.Values()) {
            handler.Handle({ Width: window.innerWidth, Height: window.innerHeight });
        }
    }
}
