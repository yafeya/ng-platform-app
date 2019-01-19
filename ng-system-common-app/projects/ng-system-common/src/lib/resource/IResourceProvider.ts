import { ResourceDictionary } from './ResourceDictionary';

export interface IResourceProvider {
    /** Get Locale */
    Locale: string;
    /** Get Resources */
    Resources: ResourceDictionary;
    /** Initialize */
    Initialize():void;
}