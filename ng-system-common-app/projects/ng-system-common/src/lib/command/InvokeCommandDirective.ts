import { Directive, ElementRef, Input, Renderer, HostListener, Inject } from '@angular/core';

import { ICommandRepository } from './ICommandRepository';
import { ILoggerFactory } from '../logging/ILoggerFactory';
import { ILogger } from '../logging/ILogger';
import { CommandRepositoryToken, LoggerFactoryToken } from '../Tokens';

@Directive({
    selector: '[InvokeCommand]'
})
export class InvokeCommandDirective {
    @Input('InvokeCommand') CommandName: string;
    @Input() CommandParam: any;

    private logger: ILogger;

    constructor(
        @Inject(CommandRepositoryToken) private commandRepository: ICommandRepository,
        @Inject(LoggerFactoryToken) loggerFactory: ILoggerFactory) {

        this.logger = loggerFactory.CreateLogger('InvokeCommand');
    }

    @HostListener('click', ['$event'])
    OnClicked() {
        this.logger.Debug(`Invoke command: ${this.CommandName} with ${JSON.stringify(this.CommandParam)}`);

        if (String.IsValid(this.CommandName)) {
            let command = this.commandRepository.GetCommand(this.CommandName);
            
            if (command != null && command.CanExecute(this.CommandParam)) {
                this.logger.Debug(`Get command with name: ${this.CommandName}, ${JSON.stringify(command)}`);
                command.Execute(this.CommandParam);
            }
        }
    }
}