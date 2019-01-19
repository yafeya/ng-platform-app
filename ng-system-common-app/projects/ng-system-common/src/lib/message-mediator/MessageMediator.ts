import { IMessageMediator } from './IMessageMediator';
import * as Actions from '../action/index';
import * as Collections from '../collections/index';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageMediator implements IMessageMediator {
    private mediators = new Collections.Dictionary<string, Collections.Dictionary<string, Actions.IAction>>();

    get Mediators(): Collections.Dictionary<string, Collections.Dictionary<string, Actions.IAction>> {
        return this.mediators;
    }

    /**
     * Register an event
     */
    RegisterHandler(topic: string, id: string, action: Actions.IAction): IMessageMediator {
        let values = this.mediators.Item(topic);
        if (values == null) {
            values = new Collections.Dictionary<string, Actions.IAction>();
            this.mediators.Add(topic, values);
        }

        values.Add(id, action);

        return this;
    }
    /**
     * Unregister an event 
     */
    UnregisterHandler(topic: string, id: string): IMessageMediator {
        let values = this.mediators.Item(topic);
        if (values != null) {
            values.Remove(id);
            if (values.Count === 0) {
                this.mediators.Remove(topic);
            }
        }
        return this;
    }
    /**
     * Trigger an event with given parameter
     */
    SendMessage(topic: string, param?: any): boolean;
    SendMessage<T>(topic: string, message?: T): boolean {

        let result = true;
        let values = this.mediators.Item(topic);
        if (values != null) {
            for (let item of values.Values()) {
                try {
                    item.Invoke(message);
                } catch (error) {
                    result = false;
                }
            }
        }
        return result;
    }
}