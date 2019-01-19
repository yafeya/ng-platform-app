import { IDisposable } from './IDisposable';

export class StringBuilder implements IDisposable {
    private content = [];
    private latest: string | null = null;

    get IsEmpty(): boolean {
        return this.content.length === 0;
    }
    Append(item: any): StringBuilder {
        this.AppendSingle(item);
        return this;
    }
    AppendLine(item: any): StringBuilder {
        this.AppendSingle(item);
        this.content.push('\r\n');
        return this;
    }
    AppendLines(items: any[]): StringBuilder {
        items.forEach(x => {
            if (x != null) {
                this.AppendLine(x);
            }
        });
        return this;
    }

    Build(): string {
        if (this.latest != null)
            return this.latest;
        this.latest = this.Join('');
        return this.latest;
    }
    Join(delimiter: string) {
        return this.content.join(delimiter);
    }

    toString() {
        return this.Build();
    }
    Dispose(): void {
        this.latest = null;
        this.content = [];
    }
    private AppendSingle(item: any): void {
        if (item != null) {
            this.latest = null;
            if (typeof item !== 'string') {
                this.content.push(item.toString());
            } else {
                this.content.push(item);
            }
        }
    }
}