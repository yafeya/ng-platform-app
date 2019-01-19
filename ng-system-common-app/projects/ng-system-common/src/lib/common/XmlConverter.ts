
declare var Xml2Js: any;

export class XmlConverter {

    /** Convert Xml to Json */
    ToJson(xml: any): any {
        let parser = Xml2Js.Parser();
        return parser.toJson(xml);
    }
}