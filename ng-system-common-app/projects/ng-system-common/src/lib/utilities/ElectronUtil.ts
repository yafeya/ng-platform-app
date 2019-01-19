import { Injectable } from '@angular/core';
import * as Common from '../common/index';

declare let electron: any;
declare let fs: any;
declare let Crypts: any;
declare let NjPath: any;
declare let Mime: any;
declare let Path: any;
declare let FileSize: any;
declare let EventStream: any;
declare let EncodingHelper: any;
declare const Buffer: any;


@Injectable()
export class ElectronUtil {
    algorithm = 'aes-256-ctr';
    password = 'a3b8d9w34';

    get Electron(): any {
        return electron;
    }
    get App(): any {
        return electron.remote.app;
    }
    get MainMenu(): any {
        return electron.remote.Menu;
    }
    get IpcClient(): any {
        return electron.ipcRenderer;
    }
    get Remote(): any {
        return electron.remote;
    }
    GetUserDataFolder(): string {
        return this.App.getPath('userData');
    }
    GetAppDataFolder(): string {
        return this.App.getPath('appData');
    }
    GetMyDocumentFolder(): string {
        return this.App.getPath('documents');
    }
    GetPictureFolder(): string {
        return this.App.getPath('pictures');
    }
    GetAppName(): string {
        return this.App.getName();
    }
    OpenFileDialog(filters: any = null): string {
        let dialog = electron.remote.dialog;
        let fileName = dialog.showOpenDialog({
            properties: ['openFile'],
            filters: filters
        });
        return fileName.toString();
    }
    OpenFilesDialog(filters: any = null): string[] {
        let dialog = electron.remote.dialog;
        let fileNames = dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: filters
        });
        return fileNames;
    }
    TextFileFilter(): any {
        return [{ name: 'Text Documents', extensions: ['txt', 'cs', 'ts', 'js', 'scss', 'css', 'html', 'htm'] }];
    }
    ImageFileFilter(): any {
        return [{ name: 'Images', extensions: ['jpg', 'png', 'gif', 'bmp'] }];
    }
    OpenImageDialog(): string {
        return this.OpenFileDialog(this.ImageFileFilter());
    }
    OpenImagesDialog(): string[] {
        return this.OpenFilesDialog(this.ImageFileFilter());
    }
    SetApplicationMenu(menu: any): void {
        electron.remote.Menu.setApplicationMenu(menu);
    }

    OpenExternal(url: string): void {
        electron.remote.shell.openExternal(url);
    }
    ShowItemInFolder(path: string): void {
        electron.remote.shell.showItemInFolder(path);
    }

    ReadFileAsync(file: string): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            if (!self.Exist(file))
                reject(new Error(`File doesn't exist.`));

            fs.readFile(file, 'binary', (error, data) => {
                        if (error)
                            reject(error);

                        let content = EncodingHelper.decode(data, 'utf8');

                        resolve(content);
                    });
        });
    }
    ReadFileLineByLine(file: string): Promise<string> {
        let self = this;
        return new Promise(function (resolve, reject) {
            let lines = [];
            let stream = fs.createReadStream(file)
                .pipe(EventStream.split())
                .pipe(EventStream.mapSync(
                    function (line) {
                        stream.pause();

                        lines.push(line);

                        stream.resume();
                    })
                    .on('error', function () {
                        reject('Read file error.');
                    })
                    .on('end', function () {
                        resolve(lines.join(''));
                    })
                );
        });
    }
    ReadFileAsBase64Async(file: string): Promise<string> {
        let self = this;
        let fullPath = this.NormalizePath(file.toString());
        console.log('Full path: ' + fullPath);
        return new Promise(function (resolve, reject) {
            if (!self.Exist(fullPath))
                reject(new Error(`File doesn't exist.' + fullPath`));

            console.log('File to open ' + fullPath);

            let data = fs.readFileSync(fullPath, 'base64');
            let buffer = new Buffer(data, 'base64');
            let base64Data = buffer.toString('base64');
            resolve(base64Data);
        });
    }
    ReadFileAsBase64(file: string): string {
        let self = this;
        let fullPath = this.NormalizePath(file.toString());
        if (!self.Exist(fullPath))
            throw Error(`File doesn't exist.${fullPath}`);

        let data = fs.readFileSync(fullPath, 'base64');
        let buffer = new Buffer(data, 'base64');
        let base64Data = buffer.toString('base64');
        return base64Data;

    }
    ReadFileStream(file: string): any {
        return fs.createReadStream(file);
    }

    WriteFileAsync(file: string, data: any): Promise<any> {
        console.log('Write data to file.');
        //console.log(file);
        //console.log(data);
        let self = this;
        return new Promise(function (resolve, reject) {
            fs.writeFile(file, data, (error) => {
                if (error)
                    reject(error);

                resolve(true);
            });
        });
    }
    GetMimeType(file: string): string {
        try {
            return Mime.lookup(file);
        } catch (error) {
            console.log('Get MIME error: ' + error);
        }
    }
    GetFilename(file: string): string {
        try {
            return Path.basename(file);
        } catch (error) {
            console.log('Get file name error: ' + error);
        }
    }
    GetFilenameWithoutExtension(file: string): string {
        let filename = this.GetFilename(file);
        return Path.parse(filename).name;
    }
    GetFileSize(file: string): number {
        let stats = fs.statSync(file);
        return stats['size'];
    }
    GetFileSizeString(file: string): string {
        try {
            let size = this.GetFileSize(file);
            let sizeString = FileSize(size);
            return sizeString;
        } catch (error) {
            console.log('Get file name error: ' + error);
        }
    }
    ConverToFileSizeString(size: number): string {
        return FileSize(size);
    }
    Encrypt(value: string): string {
        if (!value)
            return '';
        let cipher = Crypts.createCipher(this.algorithm, this.password);
        let crypted = cipher.update(value, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    Decrypt(value: string): string {
        if (!value)
            return '';
        let decipher = Crypts.createDecipher(this.algorithm, this.password)
        let dec = decipher.update(value, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }

    Exist(path: string): boolean {
        try {
            fs.accessSync(path, fs.F_OK);
            return true;
        } catch (e) {
            return false;
        }
    }

    EnsureFolderExist(path: string): void {
        if (!this.Exist(path)) {
            try {
                fs.mkdirSync(path);
            } catch (error) {
                console.log(error);
            }
        }
    }

    CombinePath(base: string, paths: string): string {
        let value: string;
        try {
            value = NjPath.join(base, paths);
        } catch (error) {
            console.log(error);
        }
        return value;
    }
    NormalizePath(path: string): string {
        return NjPath.normalize(path);
    }

    CreateGuidString(): string {
        let guid = Common.Guid.New();
        return guid.Value;
    }
    CreateGuid(): Common.Guid {
        return Common.Guid.New();
    }
}