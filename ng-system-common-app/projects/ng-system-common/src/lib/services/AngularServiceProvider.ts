
import { IServiceProvider } from './IServiceProvider';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class AngularServiceProvider implements IServiceProvider {

    /**
     *
     */
    constructor(private injector: Injector) {

    }
    /**
     * Gets the service object of the specified type.
     */
    GetService(type: any): any {
        return this.injector.get(type);
    }

}