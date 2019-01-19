
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import * as Common from './components';

const components = [

];

const directives = [
    Common.InvokeCommandDirective
];

const providers = [
    Common.DefaultLoggerFactory,
    Common.HttpClient,
    Common.LoggingExceptionHandler,
    Common.CommandRepository,
    Common.CommandDescriptorRepository,
    Common.ElectronUtil,
    Common.AngularServiceProvider,
    Common.ServiceLocator,
    Common.MessageMediator,
    Common.ComponentCreator,
    Common.OptionRepository,

    { provide: Common.ActionRepositoryToken, useClass: Common.ActionRepository },
    { provide: Common.CommandRepositoryToken, useClass: Common.CommandRepository },
    { provide: Common.CommandDescriptorRepositoryToken, useClass: Common.CommandDescriptorRepository },
    { provide: Common.ExceptionHandlerToken, useClass: Common.LoggingExceptionHandler },
    { provide: Common.LoggerFactoryToken, useClass: Common.DefaultLoggerFactory },
    { provide: Common.MessageMediatorToken, useClass: Common.MessageMediator },
    { provide: Common.ComponentCreatorToken, useClass: Common.ComponentCreator },
    { provide: Common.OptionRepositoryToken, useClass: Common.OptionRepository },
    { provide: Common.WindowSizeWatcherToken, useClass: Common.WindowSizeWatcher }
];

const exportItems = [];

@NgModule({
    declarations: [directives, components],
    imports: [CommonModule, HttpModule, JsonpModule],
    providers: providers,
    exports: [directives, exportItems]
})
export class SystemModule {

    // constructor(@Optional() @SkipSelf() parentModule: SystemModule) {
    //     if (parentModule) {
    //         throw new Error('SystemModule is already loaded. Import it in the AppModule only');
    //     }
    // }
}