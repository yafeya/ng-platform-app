import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Type, InjectionToken } from '@angular/core';
import { IComponentCreator } from './IComponentCreator';

export const ComponentCreatorToken = new InjectionToken('./ICommponentCreator');

@Injectable()
export class ComponentCreator implements IComponentCreator {

    private mViewContainer: ViewContainerRef;
    private mComponentFactoryResolver: ComponentFactoryResolver;

    get ViewContainer(): ViewContainerRef {
        return this.mViewContainer;
    }
    set ViewContainer(value: ViewContainerRef) {
        this.mViewContainer = value;
    }

    get ComponentFactoryResolver(): ComponentFactoryResolver {
        return this.mComponentFactoryResolver;
    }
    set ComponentFactoryResolver(value: ComponentFactoryResolver) {
        this.mComponentFactoryResolver = value;
    }

    /**
    * Initialize
    */
    Initialize(viewContainer: ViewContainerRef, resolver: ComponentFactoryResolver): void {
        this.mViewContainer = viewContainer;
        this.mComponentFactoryResolver = resolver;
    }


    CreateComponent(componentType: Type<{}>, viewContainer?: ViewContainerRef): ComponentRef<{}> {
        try {
            let factory = this.ComponentFactoryResolver.resolveComponentFactory(componentType);

            let component = viewContainer ?
                viewContainer.createComponent(factory) :
                this.ViewContainer.createComponent(factory);

            return component;
        } catch (error) {
            return null;
        }
    }
}
