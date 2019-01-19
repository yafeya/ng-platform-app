import { Injectable,  InjectionToken } from '@angular/core';
import { IOptionDescriptor } from './IOptionDescriptor';
import * as Collections from '../collections/index';


export const OptionRepositoryToken = new InjectionToken('./IOptionRepository');

export interface IOptionRepository {
    /**
     * Register a descriptor
     */
    Register(descriptor: IOptionDescriptor): IOptionRepository;
    /**
     * Find descriptors by given expression
     */
    Find(expression: (descriptor: IOptionDescriptor) => boolean): Collections.IEnumerable<IOptionDescriptor>;
    /**
     * Find a descriptor by id
     */
    FindOne(id: string): IOptionDescriptor;
}

@Injectable()
export class OptionRepository implements IOptionRepository {
    private descriptors = new Collections.Dictionary<string, IOptionDescriptor>();

    /**
     * Register a descriptor
     */
    Register(descriptor: IOptionDescriptor): IOptionRepository {
        if (!descriptor)
            throw new Error(`Argument descriptor is null`);

        if (!this.descriptors.ContainsKey(descriptor.Id)) {
            this.descriptors.Add(descriptor.Id, descriptor);
        }
        return this;
    }
    /**
     * Find descriptors by given expression
     */
    Find(expression: (descriptor: IOptionDescriptor) => boolean): Collections.IEnumerable<IOptionDescriptor> {
        return Collections.Enumerable.From(this.descriptors.Values().Where(x => expression(x)));
    }
    /**
     * Find a descriptor by id
     */
    FindOne(id: string): IOptionDescriptor {
        if (this.descriptors.ContainsKey(id)) {
            return this.descriptors.Item(id);
        } else {
            return null;
        }
    }
}

