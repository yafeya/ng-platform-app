
import { ICommand } from './ICommand';
import { IDictionary } from '../collections/IDictionary';


export interface ICommandRepository {
    Commands: IDictionary<string, ICommand>;

    GetCommand(name: string): ICommand;

    Register(name: string, command: ICommand): ICommandRepository;
}


