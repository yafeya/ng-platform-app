
import { IEnumerable } from './IEnumerable';

export interface ICollection<T> extends IEnumerable<T> {
  
    /** Get whether collection is readonly */
    IsReadOnly: boolean;

    /** Add item to collection */
    Add(item: T): void;
    /** Add items to collection */
    AddRange(items: T[]): void;
    /** Clear collection */
    Clear(): void;
    /** Determines whether collection contains a specific item */
    Contains(item: T): boolean;
    /** Remove item from collection */
    Remove(item: T): boolean;
    /** Copy elements to an array starting at a particular index */
    CopyTo(array: T[], arrayIndex: number);
}