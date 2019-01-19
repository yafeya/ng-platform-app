export interface IOptionDescriptor {
    /**
     * Gets or sets an id for the descriptor
     */
    Id: string;
    /**
     * gets or sets the header 
     */
    Header: string;
    /**
     * Gets or sets the url to option editor
     */
    Url: string;
    /**
     * gets or sets an icons show in front of the header
     */
    Icon?: string;
    /**
     * gets or sets a group it belong to
     */
    Group?: string;
    /** */
    Platform?: string;
    /**
     * gets or sets an order
     */
    Order?: number;
    /**
     * gets or sets whether related options were changed 
     */
    IsDirty?: boolean;
    /**
     * gets or sets a value indicate it is active
     */
    IsActive?: boolean;
    /**
     * gets or sets the data context
     */
    DataContext?: any;
    /**
     * gets or sets a tag value
     */
    Tag?: any;
}

export interface IOptionEditor {
    /**
     * gets or sets the title of editor
     */
    Title: string;
    /**
     * gets or sets a value indicate wheter the option was changed
     */
    IsDirty: boolean;

    /**
     * Submi changes and return a value indicate whether submit successfuly 
     */
    Submit(): Promise<{ Success: boolean, Message: string, Data: any }>;
}

