
declare var electron: any;
declare var fs: any;
declare var path: any;

export class Directory {

    private get App(): any {
        return electron.remote.app;
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
    /** Get current executable file */
    GetCurrentFolder(): string {
        return this.App.getPath('exe');
    }
    /** Get temporary folder */
    GetTempFolder(): string {
        return this.App.getPath('temp');
    }
    GetAppName(): string {
        return this.App.getName();
    }
    ShowItemInFolder(value: string): void {
        electron.remote.shell.showItemInFolder(value);
    }
    Exist(value: string): boolean {
        try {
            fs.accessSync(value, fs.F_OK);
            return true;
        } catch (e) {
            return false;
        }
    }

    EnsureFolderExist(value: string): void {
        if (!this.Exist(value)) {
            try {
                fs.mkdirSync(value);
            } catch (error) {
                console.log(error);
            }
        }
    }
    Combine(path1: string, path2: string): string {
        return path.join(path1, path2);
    }
}