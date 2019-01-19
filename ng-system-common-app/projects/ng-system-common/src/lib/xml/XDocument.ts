import { XElement } from './XElement';
import * as Common from '../common/index';

export class XDocument {

    private mRoot: XElement;

    get Root(): XElement {
        return this.mRoot;
    }
    set Root(value:XElement){
        this.mRoot = value;
        this.mRoot.Document = this;
    }

    Build(): XMLDocument {        
        var doc = document.implementation.createDocument("", "", null);

        doc.appendChild(this.Root.ToXmlElement(doc));
        return doc;
    }

    BuildXmlString():string{
        let builder = new Common.StringBuilder();
        let content = this.Root.ToXmlString(builder);

        return content;
    }
}