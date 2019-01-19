import { IEnumerable } from './IEnumerable';

export class EnumerableIterator<T> implements Iterator<T>{
    private pointer = 0;

    constructor(private enumerable: IEnumerable<T>) {

    }

    next(value?: any): IteratorResult<T> {       
        if (this.pointer < this.enumerable.Count) {
            return {
                done: false,
                value: this.enumerable.Items[this.pointer++]
            };
        } else {
            return {
                done: true,
                value: null
            };
        }
    }
}