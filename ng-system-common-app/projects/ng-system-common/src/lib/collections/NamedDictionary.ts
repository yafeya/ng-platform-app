import { INamedDictionary } from './INamedDictionary';


export class NamedDictionary<T> implements INamedDictionary<T> {
    private items: { [index: string]: T } = {};

    private count = 0;

    public ContainsKey(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number {
        return this.count;
    }

    public Add(key: string, value: T) {
        this.items[key] = value;
        this.count++;
    }

    public Remove(key: string): T {
        let value = this.items[key];
        delete this.items[key];
        this.count--;
        return value;
    }

    public Item(key: string): T {
        return this.items[key];
    }

    public Keys(): string[] {
        let keySet: string[] = [];

        for (let prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }

        return keySet;
    }

    public Values(): T[] {
        let values: T[] = [];

        for (let prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }

        return values;
    }
}