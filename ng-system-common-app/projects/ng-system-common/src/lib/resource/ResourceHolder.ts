import * as Common from '../common/index';
import * as Collections from '../collections/index';
import { ResourceDictionary } from './ResourceDictionary';

export class ResourceHolder {
    DefaultLocal = 'en-US';
    private mInnerDictionary = new Collections.NamedDictionary<ResourceDictionary>();

    constructor() {
        
    }

    /** Get resource dictionary by local name */
    GetResources(local: string): ResourceDictionary {
        return this.mInnerDictionary.Item(local);
    }
    /** Add resource for specific local */
    AddResources(local: string, resource: ResourceDictionary): ResourceHolder {
        if (local) {
            this.mInnerDictionary.Add(local, resource);
        }
        return this;
    }

    /** Get resource string */
    GetString(name: string, local?: string): string {
        let culture = local ? local : this.DefaultLocal;
        let resources = this.GetResources(culture);
        if (resources) {
            return resources.Get(name);
        }
        return '';
    }
}