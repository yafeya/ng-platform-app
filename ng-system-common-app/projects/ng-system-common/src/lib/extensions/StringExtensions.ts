
interface String {
    ToLower: () => string;
    ToUpper: () => string;
    Trim: () => string;
    Normalize: () => string;
    StartsWith: (part: string) => boolean;
    EndsWith: (part: string) => boolean;
    CapFirst: () => string;
    CapWords: () => string;
    TruncateWords: (number: number) => string;
    Contains: (value: string) => boolean;
    Slugify: (lower?: boolean) => string;
    StripHtml: () => string;
    EscapeHtml: () => string;
    CountWord: () => number;
    HtmlToText: () => string;
    ValidateEmail: () => boolean;
    IndexOf: (value: string) => number;
    LastIndexOf: (value: string) => number;
    SubString: (start: number, length: number) => string;
}
interface StringConstructor {
    IsNullOrEmpty: (value: any) => boolean;
    IsValid: (value: any) => boolean;
    Empty: () => string;
}


String.prototype.ToLower = function (): string {
    return this.toLowerCase();
};
String.prototype.ToUpper = function (): string {
    return this.toUpperCase();
};
String.prototype.Trim = function (): string {
    return this.replace(/^\s+|\s+$/g, '');
};
String.prototype.Normalize = function (): string {
    return this.replace(/^\s*|\s(?=\s)|\s*$/g, '');
};
String.prototype.StartsWith = function (part: string): boolean {
    return this.slice(0, part.length) === part;
};
String.prototype.EndsWith = function (part: string): boolean {
    return this.slice(part.length) === part;
};
String.prototype.CapFirst = function (): string {
    if (this.length === 1) {
        return this.toUpperCase();
    } else if (this.length > 0) {
        let regex: RegExp = /^(\(|\[|'|')/;
        if (regex.test(this)) {
            return this.substring(0, 2).toUpperCase() + this.substring(2);
        } else {
            return this.substring(0, 1).toUpperCase() + this.substring(1);
        }
    }
    return null;
};
String.prototype.CapWords = function (): string {
    let regexp: RegExp = /\s/;
    let words = this.split(regexp);
    if (words.length === 1) {
        return words[0].capFirst();
    } else if (words.length > 1) {
        let result = '';
        for (let i = 0; i < words.length; i++) {
            if (words[i].capFirst() !== null) {
                result += words[i].capFirst() + ' ';
            }
        }
        result.trim();
        return result;
    }
    return null;
};
String.prototype.TruncateWords = function (num: number): string {
    let words: Array<string> = this.split(/\s+/);
    if (words.length > num) {
        return words.slice(0, num).join(' ');
    }
    return words.join(' ');
};
String.prototype.StripHtml = function (): string {
    let content: string = this.replace(/<[\/]?([^> ]+)[^>]*>/g, '');
    content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/ig, '');
    content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/ig, '');
    content = content.replace(/<!--[\s\S]*?-->/g, '');
    content = content.replace('&nbsp;', ' ');
    content = content.replace('&amp;', '&');
    return content;
};
String.prototype.EscapeHtml = function (): string {
    let content: string = this.replace(/'/g, '&quot;');
    content.replace(/&(?!\w+;)/g, '&amp;');
    content.replace(/>/g, '&gt;');
    content.replace(/</g, '&lt;');
    return content;
};
String.prototype.Contains = function (val: string): boolean {
    if (this.indexOf(val) !== -1) {
        return true;
    }
    return false;
};
String.prototype.Slugify = function (lower: boolean = true): string {
    if (!lower) {
        return this.lower().normalize().replace(/[^a-z0-9]/gi, '-');
    }
    return this.normalize().replace(/[^a-z0-9]/gi, '-');
};
String.prototype.HtmlToText = function (): string {
    const output = this.replace(/<[^>]*>?/g, '');
    return output;
}
String.prototype.CountWord = function (): number {
    let content = this;
    if (!content)
        return 0;
    let words = '', symbols = '';
    content.replace(/([\w\s]*)([^\w;,.''{}\[\]+_)(*&\^%$#@!~\/?]*)/g, (a, b, c): string => {
        words += b;
        symbols += c;

        return a;
    });

    let count = words.trim().split(' ').length;
    if (symbols)
        count += symbols.replace(' ', '').split('').length;

    return count;
}
String.prototype.ValidateEmail = function (): boolean {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this);
}
String.prototype.IndexOf = function (value: string): number {
    return this.indexOf(value);
}
String.prototype.LastIndexOf = function (value: string): number {
    return this.lastIndexOf(value);
}
String.prototype.SubString = function (start: number, length: number): string {
    return this.substring(start, length);
}

String.IsNullOrEmpty = function (value: any): boolean {
    if (value === undefined || value === null) {
        return true;
    }
    let text = value.toString();
    if (text === '') {
        return true;
    }
    if (text && text.trim() === '') {
        return true;
    }
    return false;
};
String.IsValid = function (value: any): boolean {
    return !String.IsNullOrEmpty(value);
}
String.Empty = function (): string {
    return '';
}


