export interface ICommandDescriptor {
    /**
     * An id of the descriptor, this is useful for binding
     */
    Id?: string;
    /**
     * Display text of the command, used in menu or button
     */
    Header: string;
    /**
     * Command name used to find command from the default repository
     */
    CommandName: string;
    /**
     * Get icon, normally use fontawesome icon
     */
    Icon?: string;
    /**
     * Image url
     */
    Image?: string;
    /**
     * Group name that the command belong to
     */
    Group?: string;
    /**
     * Tag can attach to the descriptor
     */
    Tag?: any;
    /**
     * Shortcut of the command
     */
    Shortcut?: string;
    /**
     * Use for tooltip
     */
    Description?: string;
    /**
     * 
     */
    IsVisible?: boolean;

}
