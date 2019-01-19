import { ICollection } from './ICollection';

export interface IList<T> extends ICollection<T> {
    /** Get index of given item */
    IndexOf(item: T): number;
    /** Insert item to given index */
    Insert(index: number, item: T): void;
    /** Remove item at given index */
    RemoveAt(index: number): void;
}