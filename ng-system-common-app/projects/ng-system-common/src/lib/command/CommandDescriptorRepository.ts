import { ICommandDescriptorRepository } from './ICommandDescriptorRepository';
import { IEnumerable } from '../collections/IEnumerable';
import { ICommandDescriptor } from './ICommandDescriptor';
import { List } from '../collections/List';
import { Injectable } from '@angular/core';

@Injectable()
export class CommandDescriptorRepository implements ICommandDescriptorRepository {
    private descriptors = new List<ICommandDescriptor>();


    get Descriptors(): IEnumerable<ICommandDescriptor> {
        return this.descriptors;
    }
    /**
     * Register a descriptor.
     */
    Register(descriptor: ICommandDescriptor): ICommandDescriptorRepository {
        if (descriptor != null) {
            this.descriptors.Add(descriptor);
        }
        return this;
    }
    /**
    * Remove a descriptor
    */
    Remove(descriptor: ICommandDescriptor): ICommandDescriptorRepository {
        if (descriptor !== null)
            this.descriptors.Remove(descriptor);
        return this;
    }
    /**
     * Remove descriptors by given expression
     */
    RemoveRange(expression: (item: ICommandDescriptor) => boolean): void {
        if (expression === null) {
            return;
        }

        this.Descriptors.FindAll(expression)
            .ForEach(x => {
                this.descriptors.Remove(x);
            });
    }
}