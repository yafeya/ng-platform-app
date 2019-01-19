import { ICommandDescriptor } from './ICommandDescriptor';
import { IEnumerable } from '../collections/IEnumerable';

export interface ICommandDescriptorRepository {

    readonly Descriptors: IEnumerable<ICommandDescriptor>;

    /**
     * Register a descriptor.
     */
    Register(descriptor: ICommandDescriptor): ICommandDescriptorRepository;

    /**
     * Remove a descriptor
     */
    Remove(descriptor: ICommandDescriptor): ICommandDescriptorRepository;
    /**
     * Remove descriptors by given expression
     */
    RemoveRange(expression: (item: ICommandDescriptor) => boolean): void;
}