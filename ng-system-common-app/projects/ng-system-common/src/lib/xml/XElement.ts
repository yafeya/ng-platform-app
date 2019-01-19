import { XObject } from './XObject';
import { XAttribute } from './XAttribute';
import * as Common from '../common/index';

export class XElement extends XObject {
    Elements: Array<XElement> = [];
    Attributes: Array<XAttribute> = [];
    Parent: XElement;

    constructor(name: string, value: any = null) {
        super(name, value);
    }

    AppendChild(element: XElement): XElement {
        if (!element)
            throw new Error('element is null.');

        this.Elements.push(element);
        element.Document = this.Document;
        element.Parent = this;

        return this;
    }
    AppendAttribute(attribute: XAttribute) {
        if (!attribute)
            throw new Error('attribute is null.');

        this.Attributes.push(attribute);
        attribute.Document = this.Document;
    }
    ToXmlElement(doc: XMLDocument): HTMLElement {
        let element = doc.createElement(this.Name);
        if (this.Value) {
            if (this.Name == "base64")
                console.log(this.Value);
            element.appendChild(document.createTextNode(this.Value));
        }

        this.Attributes.forEach(function (attribute) {
            element.setAttribute(attribute.Name, attribute.Value);
        });

        this.Elements.forEach(function (child) {
            element.appendChild(child.ToXmlElement(doc));
        });

        return element;
    }

    ToXmlString(builder: Common.StringBuilder): string {

        builder.Append('<' + this.Name + '>');
        if (this.Value) {
            builder.Append(this.Value);
        } else {
            this.Elements.forEach(function (child) {
                child.ToXmlString(builder);
            });
        }

        builder.Append('</' + this.Name + '>');
        return builder.Build();
    }
}
