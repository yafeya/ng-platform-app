
/**
 * Defines a mechanism for retrieving a service object; that is, 
 * an object that provides custom support to other objects.
 */
export interface IServiceProvider {

    /**
     * Gets the service object of the specified type.
     */
    GetService(type: any): any;
}