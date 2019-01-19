import { ICommandDescriptor } from './ICommandDescriptor';

export class CommandDescriptor implements ICommandDescriptor {

    constructor(public Header: string, public CommandName: string,
        public Group?: string, public Icon?: string,
        public Image?: string, public Description?: string,
        public Id?: string, public Tag?: any, public Shortcut?: string) {

    }
}