import { IEnumerable } from './IEnumerable';
import { Enumerable } from './Enumerable';
import { List } from './List';

import { ObservableCollection } from './ObservableCollection';
import { IGrouping, Grouping } from './IGrouping';
import { Dictionary } from './Dictionary';
import { IList } from './IList';
import { IDictionary } from './IDictionary';

/** Do ForEach on items */
export function ForEach<T>(this: IEnumerable<T>, action: (item: T) => void): void {
    if (!action) {
        throw new Error(`Argument 'item' is null.`);
    }

    for (let item of this.Items) {
        action(item);
    }
}
/** Sort items by given comparer */
export function Sort<T>(this: IEnumerable<T>, comparer: (x: T, y: T) => number): void {
    if (!comparer)
        throw new Error(`Argument 'comparer' is null.`);

    this.Items = this.Items.sort(comparer);
}
/** Find items by given predicate */
export function FindAll<T>(this: IEnumerable<T>, predicate: (item: T) => boolean): IEnumerable<T> {
    if (!predicate)
        throw new Error(`Argument 'predicate' is null.`);

    let result = new List<T>();
    for (let item of this.Items) {
        if (predicate(item))
            result.Add(item);
    }

    return Enumerable.From(result.Items);
}
/** Find first item in the list */
export function FirstOrDefault<T>(this: IEnumerable<T>, predicate?: (item: T) => boolean): T {

    let result: T;

    result = this.Items.FirstOrDefault(predicate);

    return result;
}
export function IsEmpty<T>(this: IEnumerable<T>): boolean {
    return !(this.Items && this.Items.length > 0);
}
export function Any<T>(this: IEnumerable<T>, predicate?: (source: any) => boolean): boolean {
    if (predicate) {
        for (let item of this.Items) {
            if (predicate(item))
                return true;
        }
        return false;
    } else {
        if (this.Items.length === 0) {
            return false;
        }
        return true;
    }
}
export function Max<T>(this: IEnumerable<T>, selector: (source: T) => number): number {

    let max = this.Select(selector).Items.reduce(function (a: number, b: number) {
        return Math.max(a, b);
    });
    return max;
}
export function Min<T>(this: IEnumerable<T>, selector: (source: T) => any): number {
    let min = this.Select(selector).Items.reduce(function (a: number, b: number) {
        return Math.min(a, b);
    });
    return min;
}
export function OrderBy<T>(this: IEnumerable<T>, keySelector: (source: T) => any): IEnumerable<T> {
    // return Enumerable.From(this.Items.OrderBy(keySelector));
    let values = this.Items.sort(function (a: any, b: any) {
        return keySelector(a) - keySelector(b);
    });

    return Enumerable.From(values);
}
export function OrderByDescending<T>(this: IEnumerable<T>, keySelector: (source: T) => any): IEnumerable<T> {
    // return Enumerable.From(this.Items.OrderByDescending(keySelector));

    let values = this.Items.sort(function (a: any, b: any) {
        return keySelector(b) - keySelector(a);
    });

    return Enumerable.From(values);
}
export function Where<T>(this: IEnumerable<T>, predicate: (source: T) => boolean): IEnumerable<T> {
    //return Enumerable.From(this.Items.Where(predicate));

    let values = this.Items.filter((x: any) => {
        return predicate(x);
    });
    return  Enumerable.From(values);
}
export function Select<TSource, TResult>(this: IEnumerable<TSource>, selector: (source: TSource) => TResult): IEnumerable<TResult> {
    //return Enumerable.From<TResult>(this.Items.Select(selector));
    let result = [];
    for (let item of this.Items) {
        result.push(selector(item));
    }
    return Enumerable.From(result);
}
export function ElementAt<T>(this: IEnumerable<T>, index: number): T {
    let values = this.Items;
    return values[index];
}
export function GroupBy<T, TKey, TElement>(this: IEnumerable<T>, keySelector: (source: T) => TKey, valueSelector?: (source: T) => any): IEnumerable<IGrouping<TKey, TElement>> {
    if (!this)
        throw new Error(`Parameter is null`);
    if (!keySelector)
        throw new Error(`Parameter 'keySelelctor'is null`);
    if (!valueSelector)
        valueSelector = x => x;

    let dictionary = new Dictionary<TKey, IList<TElement>>();

    this.ForEach(x => {
        let key = keySelector(x);
        let value = valueSelector ? valueSelector(x) : x;

        let values: IList<TElement>;
        if (dictionary.ContainsKey(key)) {
            let item = dictionary.Item(key);
            values = item ? item : new List<TElement>();
        } else {
            values = new List<TElement>();
            dictionary.Add(key, values);
        }
        values.Add(value);
    });

    let groups = new List<IGrouping<TKey, TElement>>();

    dictionary.ForEach(x => {
        groups.Add(new Grouping(x.Key, x.Value));
    })
    return groups;
}

declare module './Enumerable' {
    interface Enumerable<T> {
        ForEach: (action: (item: T) => void) => void;
        Sort: (comparer: (x: T, y: T) => number) => void;
        FindAll: (predicate: (item: T) => boolean) => IEnumerable<T>;
        FirstOrDefault: (predicate?: (item: T) => boolean) => T;
        IsEmpty: () => boolean;
        Any: (predicate?: (source: any) => boolean) => boolean;
        Max: (selector: (source: T) => any) => number;
        Min: (selector: (source: T) => any) => number;
        OrderBy: (keySelector: (source: T) => any) => IEnumerable<T>;
        OrderByDescending: (keySelector: (source: T) => any) => IEnumerable<T>;
        Where: (predicate: (source: T) => boolean) => IEnumerable<T>;
        Select: <T, TResult>(selector: (source: T) => TResult) => IEnumerable<TResult>;
        ElementAt: (index: number) => T;
        GroupBy: <TKey, TElement>  (keySelector: (source: T) => TKey, valueSelector?: (source: T) => TElement) => IEnumerable<IGrouping<TKey, TElement>>;
    }
}
declare module './IEnumerable' {
    interface IEnumerable<T> {
        ForEach: (action: (item: T) => void) => void;
        Sort: (comparer: (x: T, y: T) => number) => void;
        FindAll: (predicate: (item: T) => boolean) => IEnumerable<T>;
        FirstOrDefault: (predicate?: (item: T) => boolean) => T;
        IsEmpty: () => boolean;
        Any: (predicate?: (source: any) => boolean) => boolean;
        Max: (selector: (source: T) => any) => number;
        Min: (selector: (source: T) => any) => number;
        OrderBy: (keySelector: (source: T) => any) => IEnumerable<T>;
        OrderByDescending: (keySelector: (source: T) => any) => IEnumerable<T>;
        Where: (predicate: (source: T) => boolean) => IEnumerable<T>;
        Select: <T, TResult>(selector: (source: T) => TResult) => IEnumerable<TResult>;
        ElementAt: (index: number) => T;
        GroupBy: <TKey, TElement>  (keySelector: (source: T) => TKey, valueSelector?: (source: T) => TElement) => IEnumerable<IGrouping<TKey, TElement>>;
    }
}
declare module './ObservableCollection' {
    interface ObservableCollection<T> {
        ForEach: (action: (item: T) => void) => void;
        Sort: (comparer: (x: T, y: T) => number) => void;
        FindAll: (predicate: (item: T) => boolean) => IEnumerable<T>;
        FirstOrDefault: (predicate?: (item: T) => boolean) => T;
        IsEmpty: () => boolean;
        Any: (predicate?: (source: any) => boolean) => boolean;
        Max: (selector: (source: T) => any) => number;
        Min: (selector: (source: T) => any) => number;
        OrderBy: (keySelector: (source: T) => any) => IEnumerable<T>;
        OrderByDescending: (keySelector: (source: T) => any) => IEnumerable<T>;
        Where: (predicate: (source: T) => boolean) => IEnumerable<T>;
        Select: <T, TResult>(selector: (source: T) => TResult) => IEnumerable<TResult>;
        ElementAt: (index: number) => T;
        GroupBy: <TKey, TElement>  (keySelector: (source: T) => TKey, valueSelector?: (source: T) => TElement) => IEnumerable<IGrouping<TKey, TElement>>;
    }
}

Enumerable.prototype.ForEach = ForEach;
Enumerable.prototype.Sort = Sort;
Enumerable.prototype.FindAll = FindAll;
Enumerable.prototype.FirstOrDefault = FirstOrDefault;
Enumerable.prototype.IsEmpty = IsEmpty;
Enumerable.prototype.Any = Any;
Enumerable.prototype.Max = Max;
Enumerable.prototype.Min = Min;
Enumerable.prototype.OrderBy = OrderBy;
Enumerable.prototype.OrderByDescending = OrderByDescending;
Enumerable.prototype.Where = Where;
Enumerable.prototype.Select = Select;
Enumerable.prototype.ElementAt = ElementAt;
Enumerable.prototype.GroupBy = GroupBy;

ObservableCollection.prototype.ForEach = ForEach;
ObservableCollection.prototype.Sort = Sort;
ObservableCollection.prototype.FindAll = FindAll;
ObservableCollection.prototype.FirstOrDefault = FirstOrDefault;
ObservableCollection.prototype.IsEmpty = IsEmpty;
ObservableCollection.prototype.Any = Any;
ObservableCollection.prototype.Max = Max;
ObservableCollection.prototype.Min = Min;
ObservableCollection.prototype.OrderBy = OrderBy;
ObservableCollection.prototype.OrderByDescending = OrderByDescending;
ObservableCollection.prototype.Where = Where;
ObservableCollection.prototype.Select = Select;
ObservableCollection.prototype.ElementAt = ElementAt;
ObservableCollection.prototype.GroupBy = GroupBy;