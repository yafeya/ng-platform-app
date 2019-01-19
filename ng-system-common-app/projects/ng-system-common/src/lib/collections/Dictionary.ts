import { IDictionary } from './IDictionary';
import { Enumerable } from './Enumerable';
import { KeyValuePair } from './KeyValuePair';

export class Dictionary<TKey, TValue> extends Enumerable<KeyValuePair<TKey, TValue>> implements IDictionary<TKey, TValue> {
    private map = new Map<TKey, TValue>();

    Add(key: TKey, value: TValue): void {
        this.map.set(key, value);
        this.Items.Add(new KeyValuePair(key, value));
    }
    ContainsKey(key: TKey): boolean {
        return this.map.has(key);
    }
    // Count(): number {
    //     return this.items.size;
    // }
    Item(key: TKey): TValue {
        return this.map.get(key);
    }
    Keys(): TKey[] {
        let keys = [];

        this.map.forEach((value, key) => {
            keys.push(key);
        })
        return keys;
    }
    Remove(key: TKey): boolean {

        let item = this.Items.FirstOrDefault(x => x.Key === key);
        if (item)
            this.Items.Remove(item);
        return this.map.delete(key);
    }
    Values(): TValue[] {
        let values = [];
        this.map.forEach((value, key) => {
            values.push(value);
        })
        return values;
    }
}