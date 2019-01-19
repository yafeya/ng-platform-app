import {XDocument } from './XDocument';

export class XObject {
    Name: string;
    Value: any;
    private mDocument: XDocument;

    get Document() {
        return this.mDocument;
    }
    set Document(value: XDocument) {
        this.mDocument = value;
    }

    /**
     *
     */
    constructor(name: string, value: any) {
        this.Name = name;
        this.Value = value;
    }

}
