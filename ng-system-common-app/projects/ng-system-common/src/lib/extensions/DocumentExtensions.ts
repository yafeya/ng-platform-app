interface Document {
    SelectOne: (selector: string) => Element;
    SelectAll: (selector: string) => NodeListOf<Element>;
    Create: (html: string) => Element;
}

interface NodeList {
    ForEach: (callback: Function) => void;
    Last: () => Element;
}

interface Element {
    Attribute: (name: string, value?: string) => string & Element;
    Parent: () => Element;
    First: (selector: string) => Element;
    Append: (html: string) => Element;
    Empty: () => Element;
    Drop: () => Element;
    RemoveEvent: (event: string) => Element;
    AddEvent: (event: string, callback: Function, overwrite?: boolean) => Element;
    Show: (t?: string) => Element;
    Hide: () => Element;
    Toggle: () => Element;
    AddClass: (className: string) => Element;
    RemoveClass: (className: string) => Element;
    AsString: () => string;
    SelectOne: (selector: string) => Element;
    SelectAll: (selector: string) => NodeListOf<Element>;
    HasMatches: (selector: string) => boolean;
    Up: (selector: string) => Element;
    IsHidden: () => Boolean;
}

interface HTMLElement {
    Clean: () => HTMLElement;
    Value: (val?: string) => string;
}



Document.prototype.SelectOne = function (selector: string): Element {
    return document.querySelector(selector);
};

Document.prototype.SelectAll = function (selector: string): NodeListOf<Element> {
    return document.querySelectorAll(selector);
};

Document.prototype.Create = function (html: string): Element {
    let placeholder = document.createElement('div');
    placeholder.innerHTML = html;
    return <Element>placeholder.childNodes[0];
};

NodeList.prototype.ForEach = function (callback: Function): void {
    for (let i = 0; i < this.length; i++) {
        callback(i, this[i]);
    }
};

NodeList.prototype.Last = function (): Element {
    return this[this.length - 1];
};

Element.prototype.SelectOne = function (selector: string): Element {
    return this.querySelector(selector);
};

Element.prototype.SelectAll = function (selector: string): NodeListOf<Element> {
    return this.querySelectorAll(selector);
};

Element.prototype.Attribute = function (name: string, value?: string): string & Element {
    if (value != null) {
        this.setAttribute(name, value);
        return this;
    }
    return this.getAttribute(name);
};

Element.prototype.Parent = function (): Element {
    return this.parentNode;
};

Element.prototype.HasMatches = function (selector: string): boolean {
    if ((<any>this).matches != null) {
        return (<any>this).matches(selector);
    } else if ((<any>this).msMatchesSelector != null) {
        return (<any>this).msMatchesSelector(selector);
    }
    return false;
};

Element.prototype.Up = function (selector: string): Element {
    let el: Element = this;
    if ((<any>el).closest != null) {
        return (<any>el).closest(selector);
    } else {
        while (el) {
            if (el.HasMatches(selector)) {
                return <Element>el;
            }
            el = el.parentElement;
        }
    }
};

Element.prototype.First = function (selector: string): Element {
    function _decend(node: Element): Element {
        let _currentNode = node;
        let nodeList: NodeList = _currentNode.childNodes;
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeName.ToLower() === selector.ToLower()) {
                return <Element>nodeList[i];
            }
        }
        _decend(_currentNode);
    }
    return _decend(this);
};

Element.prototype.Append = function (html: string): Element {
    this.insertAdjacentHTML('beforeend', html);
    return this;
};

Element.prototype.Empty = function (): Element {
    this.innerHTML = '';
    return this;
};

Element.prototype.Drop = function (): Element {
    let self = this;
    let parent = self.parentNode;
    parent.removeChild(self);
    return self;
};

Element.prototype.RemoveEvent = function (event: string): Element {
    let evt = this[`on${event}`] || this[`${event}`];
    try {
        this.removeEventListener(event, evt);
    } catch (e) { }
    try {
        this.detachEvent(`on${event}`, evt);
    } catch (e) { }
    this[`on${event}`] = null;
    this[`${event}`] = null;
    return this;
};

Element.prototype.AddEvent = function (event: string, callback: Function, overwrite: boolean = false): Element {
    if (overwrite) {
        this[`on${event}`] = callback;
    } else {
        this.addEventListener(event, callback);
    }
    return this;
};

Element.prototype.Show = function (t: string = 'block'): Element {
    let styles = this.attribute('style');
    if (styles != null && styles !== '') {
        return this.attribute('style', styles.setValueByKey('display', t));
    }
    return this.attribute('style', `display:${t}`);
};

Element.prototype.Hide = function (): Element {
    let styles = this.attribute('style');
    if (styles != null && styles !== '') {
        return this.attribute('style', styles.setValueByKey('display', 'none'));
    }
    return this.attribute('style', `display:none;`);
};
Element.prototype.Toggle = function (): Element {
    if (!(this.offsetWidth || this.offsetHeight || this.getClientRects().length)) {
        return this.show();
    } else {
        return this.hide();
    }
};

Element.prototype.AddClass = function (className: string): Element {
    this.className += ` ${className}`;
    this.className = this.className.trim();
    return this;
};

Element.prototype.RemoveClass = function (className: string): Element {
    this.className = (<string>this.className).replace(className, '').normalize();
    return this;
};

Element.prototype.AsString = function (): string {
    return this.outerHTML;
};

Element.prototype.IsHidden = function (): boolean {
    return (this.offsetParent === null);
};

HTMLElement.prototype.Clean = function (): HTMLElement {
    this.value = this.value.replace(/\r?\n/g, '\r\n');
    return this;
};

HTMLElement.prototype.Value = function (val?: string): string {
    if (val != null) {
        if (this.nodeName.lower() === 'textarea') {
            this.innerHTML = val;
            try {
                this.innerText = val;
            } catch (e) { }
            try {
                this.value = val;
            } catch (e) { }
        } else if (this.nodeName.lower() === 'input') {
            switch (this.attribute('type').lower()) {
                case 'file':
                    break;
                case 'checkbox':
                    if (<boolean><any>val) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                    break;
                case 'radio':
                    let name: string = this.attribute('name');
                    let radios: NodeListOf<Element> = document.SelectAll(`input[type='radio'][name='${name}']`);
                    radios.ForEach(function (idx, elem: Element) {
                        if (elem.Attribute('value') === val) {
                            (<HTMLInputElement>elem).checked = true;
                        } else {
                            (<HTMLInputElement>elem).checked = false;
                        }
                    });
                    break;
                default:
                    this.value = val;
                    break;
            }
        } else if (this.nodeName.lower() === 'select') {
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].value === val) {
                    this.selectedIndex = i;
                    break;
                }
            }
        }
    } else {
        if (this.nodeName.lower() === 'textarea') {
            try {
                return this.value;
            } catch (e) { }
            if (this.innerText != null && (<string>this.innerText).trim() !== '') {
                return this.innerText;
            } else if (this.innerHTML != null && (<string>this.innerHTML).trim() !== '') {
                return this.innerHTML;
            }
            return null;
        } else if (this.nodeName.lower() === 'input') {
            switch (this.attribute('type').lower()) {
                case 'checkbox':
                    return this.checked;
                case 'radio':
                    let name: string = this.attribute('name');
                    return (<HTMLInputElement>document.SelectOne(`input[type='radio'][name='${name}']:checked`)).value;
                default:
                    return this.value;
            }
        } else if (this.nodeName.lower() === 'select') {
            return this.options[this.selectedIndex].value;
        }
    }
    return val;
};