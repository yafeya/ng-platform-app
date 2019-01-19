import { Injector, Type, InjectionToken, Injectable } from '@angular/core';

@Injectable()
export class ServiceLocator {
    
    private static currentProvider: Injector = undefined;

    static SetLocatorProvider(provider: () => Injector): void {
        ServiceLocator.currentProvider = provider();
    }

    static GetService<T>(token: Type<T> | InjectionToken<T>): T {
        return ServiceLocator.currentProvider.get(token);
    }

}