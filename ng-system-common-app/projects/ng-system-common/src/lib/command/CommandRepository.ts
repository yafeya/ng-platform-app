import { ICommandRepository } from './ICommandRepository';
import { ICommand } from './ICommand';
import { Dictionary } from '../collections/Dictionary';
import { Injectable } from '@angular/core';

@Injectable()
export class CommandRepository implements ICommandRepository {

    Commands = new Dictionary<string, ICommand>();

    GetCommand(name: string): ICommand {

        let command = this.Commands.Item(name);

        return command;
    }

    Register(name: string, command: ICommand): ICommandRepository {
        if (!name)
            throw new Error('Name value is null.');
        if (!command)
            throw new Error('Command value is null.')

        this.Commands.Add(name, command);

        return this;
    }
}