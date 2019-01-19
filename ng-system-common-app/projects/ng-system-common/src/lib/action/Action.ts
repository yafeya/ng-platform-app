import { IAction } from './IAction';

export class Action implements IAction {
    Name: string;
    Group: string;
    Tag: any;

    constructor(private delegate: (args?: any) => void) { }

    Invoke(args?: any): void {
        if (this.delegate)
            this.delegate(args);
    }
}