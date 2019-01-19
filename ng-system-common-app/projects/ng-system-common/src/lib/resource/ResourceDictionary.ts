
import * as Collections from '../collections/index';

export class ResourceDictionary {
    Local: string;
    private mInnerDictionary = new Collections.NamedDictionary<string>();

    /** Add resource value */
    Add(key: string, value: string): ResourceDictionary {
        if (key) {
            this.mInnerDictionary.Add(key, value);
        }
        return this;
    }

    /** Get resource value */
    Get(key: string): string {
        if (key) {
            return this.mInnerDictionary.Item(key);
        }

        return '';
    }
}