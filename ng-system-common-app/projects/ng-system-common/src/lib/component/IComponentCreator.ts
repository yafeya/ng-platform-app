import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';

export interface IComponentCreator {
    readonly ViewContainer: ViewContainerRef;
    /**
     * Initialize
     */
    Initialize(viewContainer: ViewContainerRef, resolver: ComponentFactoryResolver): void;

    /**
     * Create a component by give type
     */
    CreateComponent(componentType: Type<{}>, viewContainer?: ViewContainerRef): ComponentRef<{}>;
}
