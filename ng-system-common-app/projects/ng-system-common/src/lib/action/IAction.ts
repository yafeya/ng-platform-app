export interface IAction {
    Name: string;
    Group: string;
    Tag: any;

    Invoke(args?: any): void;
}
