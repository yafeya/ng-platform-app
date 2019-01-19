
export interface ICommand {

    CanExecute(param: any): boolean;

    Execute(param: any): void;
}

export class DelegateCommand implements ICommand {

    constructor(
        private canExecute: (param: any) => boolean,
        private action: (param: any) => void) {

    }

    CanExecute(param: any): boolean {
        if (this.canExecute === null)
            return true;
        return  this.canExecute(param);
    }

    Execute(param: any): void {
        if (this.action) {
            try {
                this.action(param);
            } catch (error) {
                throw error;
            }
        }
    }

    /**
     * Create a command from given actions.
     * @param action executed action
     * @param canExecute can execue action
     */
    static From(action: (param?: any) => void, canExecute?: (param?: any) => boolean): ICommand {
        if (!canExecute)
            canExecute = (param?: any) => true;
        return new DelegateCommand(canExecute, action);
    }
}