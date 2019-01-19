declare var fs: any;
//import * as fs from 'fs';
/**
 * Angular CLI doesn't support import node module right now, have to use
 * declare 
 * https://github.com/angular/angular-cli/issues/3482
 */

export class File {
    /**
     * Check whether given file is exist.
     * @param filename full file name with path
     */
    static Exists(filename: string): boolean {
        let existed: boolean;
        try {            
            existed = fs.existsSync(filename);
        } catch (error) {
            console.log(error);
            existed = false;
        }
        return existed;
    }

    static Create(filename: string, content: string): void {
        try {
            fs.writeFileSync(filename, content);
        } catch (error) {
            console.log(error);
        }
    }

    static Delete(filename: string): void {
        try {
            fs.unlinkSync(filename);
        } catch (error) {
            console.log(error);
        }
    }

    static ReadAllText(filename: string, encoding: string): string {
        let content: string;
        try {
            content = fs.readFileSync(filename, encoding);
        } catch (error) {
            console.log(error);
            content = undefined;
        }
        return content;
    }

    static Copy(source: string, target: string, overwrite: boolean): void {
        try {
            let goodToWrite = false;
            let sourceStream = fs.createReadStream(source);
            if (this.Exists(target)) {
                if (overwrite) {
                    fs.unlinkSync(target);
                    goodToWrite = true;
                }
            } else {
                goodToWrite = true;
            }

            if (goodToWrite) {
                sourceStream.pipe(fs.createWriteStream(target));
            }
        } catch (error) {
            console.log(error);
        }
    }

    static FindFolder(filename: string) {
        let folder: string = undefined;
        if (filename && this.Exists(filename)) {
            folder = filename.substr(0, filename.lastIndexOf('/'));
            if(String.IsNullOrEmpty(folder)){
                folder = filename.substr(0, filename.lastIndexOf('\\'));
            }
        }
        return folder;
    }
}