
export class AppSettingItem {
    Id: string;
    Name: string;
    Value: any;

    get ToString(): string {
        return `AppSettingItem Name:'${this.Name}', Id:'${this.Id}', Value:'${this.Value}'`;
    }
}