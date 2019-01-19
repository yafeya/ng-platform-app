import { Action } from './Action';
import * as Collections from '../collections/index';

import { IAction } from './IAction';

export interface IActionRepository {
    readonly Actions: Collections.List<IAction>;

    Register(action: IAction): IActionRepository;
    Find(expression: (action: IAction) => boolean): Collections.IEnumerable<IAction>;
    FindOne(name: string): IAction;
}


export class ActionRepository implements IActionRepository {
    readonly Actions = new Collections.List<IAction>();

    Register(action: IAction): ActionRepository {
        if (action) {
            this.Actions.Add(action);
        }
        return this;
    }

    Find(expression: (action: IAction) => boolean): Collections.IEnumerable<IAction> {
        return this.Actions.FindAll(expression);
    }

    FindOne(name: string): IAction {
        return this.Actions.FirstOrDefault(x => x.Name === name);
    }
}