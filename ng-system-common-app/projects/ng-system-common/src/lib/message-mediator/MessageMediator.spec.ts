import { TestBed, async } from '@angular/core/testing';
import { IMessageMediator } from './IMessageMediator';
import { MessageMediator } from './MessageMediator';
import * as Actions from '../action/index';

class FackeAction implements Actions.IAction {
    Name: string;
    Group: string;
    Tag: any;
    IsInvoked = false;
    Param: any;
    Invoke(para: any): void {
        this.IsInvoked = true;
        this.Param = para;
    }
}
describe('MessageMediator', () => {
    let mediator: MessageMediator;

    beforeEach(async(() => {
        mediator = new MessageMediator();
    }));

    it('empty', async(() => {

    }));
    it('instance is valid', async(() => {
        expect(mediator).toBeTruthy();
        expect(mediator.Mediators).toBeTruthy();
        expect(mediator.Mediators.Count).toEqual(0);
    }));

    it('register action', async(() => {
        mediator.RegisterHandler('test', '1', new FackeAction());

        expect(mediator.Mediators.Count).toEqual(1);
    }));

    it('unregister action', async(() => {
        mediator.RegisterHandler('test', '1', new FackeAction());

        expect(mediator.Mediators.Count).toEqual(1);

        mediator.UnregisterHandler('test', '1');

        expect(mediator.Mediators.Count).toEqual(0);
    }));


    it('send message', async(() => {
        let action = new FackeAction();
        mediator.RegisterHandler('test', '1', action);

        mediator.SendMessage('test', 'hello');
        expect(action.IsInvoked).toEqual(true);
        expect(action.Param).toEqual('hello');
    }));
});