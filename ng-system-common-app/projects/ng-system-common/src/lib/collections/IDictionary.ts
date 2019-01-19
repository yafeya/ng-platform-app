import { IEnumerable } from './IEnumerable';
import { KeyValuePair } from './KeyValuePair';

export interface IDictionary<TKey, TValue> extends IEnumerable<KeyValuePair<TKey, TValue>>  {
    Add(key: TKey, value: TValue): void;
    ContainsKey(key: TKey): boolean;
    // Count(): number;
    Item(key: TKey): TValue;
    Keys(): TKey[];
    Remove(key: TKey): boolean;
    Values(): TValue[];
}