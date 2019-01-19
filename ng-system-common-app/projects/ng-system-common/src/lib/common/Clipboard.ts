
declare let clipboard: any;

export class Clipboard {
    /**
     * 
     */
    ContainsImage(): boolean {
        let formats: string[] = clipboard.availableFormats();
        return formats.some(x => x === 'image/png' || x === 'image/jpeg' || x === 'image/jpg' || x === 'image/gif');
    }

    /** Get image data from clipboard */
    GetImage(): any {
        let formats = clipboard.availableFormats();

        let native = clipboard.readImage();

        return native;
    }
    GetAvailableFormats(): string[] {
        return clipboard.availableFormats();
    }
    /**
     * Get image data URL
     */
    GetImageUrl(): string {
        let url = '';
        let image = this.GetImage();
        if (image) {
            url = image.toDataURL();
        }
        return url;
    }
    /** Get PNG format image encoded with base64 */
    GetPngImage(): any {
        let data: any;
        let image = this.GetImage();
        if (image) {
            data = image.toPNG();
        }
        return data;
    }
    /** Get PNG format image encoded with base64 */
    GetPngBase64Image(): string {
        let data = '';
        let image = this.GetImage();
        if (image) {
            let buffer = image.toPNG();
            data = buffer.toString('base64');
        }
        return data;
    }
    Clear(): void {
        clipboard.clear();
    }
    /**  Clears the Clipboard and then adds text data in the Text or UnicodeText format, depending on the operating system.*/
    SetText(text: string): void {
        try {
            if (clipboard !== null) {
                clipboard.writeText(text);
            }
        } catch (e) {
            console.log(e);
        }

        if (document) {
            try {

                let temp = document.createElement('textarea');
                document.body.appendChild(temp);
                temp.textContent = text;
                let currentFocus: any = document.activeElement;
                temp.focus();
                temp.setSelectionRange(0, temp.value.length);
                document.execCommand('copy');
                if (currentFocus) {
                    currentFocus.focus();
                }
                document.body.removeChild(temp);
            } catch (e) {
                console.log(e);
            }
        }
    }
    /**
     * Get text conent from clipboard
     */
    GetText(): string {
        return clipboard.readText();
    }
    /**
     * Get HTML fromat text content from clipboard
     */
    GetHtml(): string {
        return clipboard.readHTML();
    }
    /**
     * Set HTML format content to clipboard
     * @param value HTML format content
     */
    SetHtml(value: string): void {
        return clipboard.writerHTML(value);
    }
    /**
     * Get RTF format text from clipboard
     */
    GetRTF(): string {
        return clipboard.readRTF();
    }
    /**
     * Set RTF format content to clipboard
     * @param value RTF format content
     */
    SetRTF(value: string): void {
        clipboard.writerRTF(value);
    }
}