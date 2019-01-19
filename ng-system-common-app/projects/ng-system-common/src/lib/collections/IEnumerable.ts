
export interface IEnumerable<T> extends Iterable<T> {
    /** Get all items */
    Items: T[];

    /** Get counts of collection */
    readonly Count: number;

}
