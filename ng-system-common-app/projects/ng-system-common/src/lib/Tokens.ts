import { InjectionToken } from '@angular/core';



export const MessageMediatorToken = new InjectionToken('./message-mediator/IMessageMediator');
export const LoggerFactoryToken = new InjectionToken('./logging/ILoggerFactory');
export const ExceptionHandlerToken = new InjectionToken('./exception/IExceptionHandler');
export const CommandRepositoryToken = new InjectionToken('./command/ICommandRepository');
export const CommandDescriptorRepositoryToken = new InjectionToken('./command/ICommandDescriptorRepository');
export const ActionRepositoryToken = new InjectionToken('./action/IActionRepository');
