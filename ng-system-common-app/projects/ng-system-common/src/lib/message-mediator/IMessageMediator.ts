import * as Actions from '../action/index';

export interface IMessageMediator {
    /**
     * Register an event
     * @topic the topic of the mediator
     * @id the unique id of the action
     * @action instance of IAction
     */
    RegisterHandler(topic: string, id: string, action: Actions.IAction): IMessageMediator;
    /**
     * Unregister an event 
     * @topic the topic of the mediator
     * @id the unique id of the action
     */
    UnregisterHandler(topic: string, id: string): IMessageMediator;
    /**
     * Trigger an event with given parameter
     * @topic the topic of the mediator
     * @message the message send to destination
     */
    SendMessage(topic: string, message?: any): boolean;
    SendMessage<T>(topic: string, message?: T): boolean;
}