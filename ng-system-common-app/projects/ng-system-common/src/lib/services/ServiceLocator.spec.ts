import { TestBed, async } from '@angular/core/testing';
import { Injectable, ReflectiveInjector, InjectionToken } from '@angular/core';
import { ServiceLocator } from './ServiceLocator';
import { Dictionary } from '../collections/Dictionary';


interface IAuto {
    Run(): void;
    Name: string;
}
class Auto implements IAuto {
    Run(): void {

    }
    Name = 'bmw';
}

export function Mark<T>(ctor: { new(): T }) {

    let name = ctor.name;
    return new InjectionToken<T>(name);
}

describe('ServiceLocator', () => {
    it(`empty`, async(() => {

    }));

    it(`should get service`, async(() => {
        let type = Auto;
        let token = Mark<IAuto>(type); //new InjectionToken<IAuto>('IAuto');
        let injector = ReflectiveInjector.resolveAndCreate([{ provide: token, useClass: type }]);

        ServiceLocator.SetLocatorProvider(() => injector);

        let actual = ServiceLocator.GetService<IAuto>(token);
        expect(actual).toBeTruthy();
        expect(actual instanceof Auto).toBe(true);
        //expect(actual instanceof IAuto).toBe(true);
        expect(actual.Name).toEqual('bmw');

        console.log(Mark<IAuto>(type));
    }));


});
