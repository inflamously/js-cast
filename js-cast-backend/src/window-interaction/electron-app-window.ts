import { BrowserWindow } from "electron";
import * as path from "path"

export interface ElectronAppWindow<T> {
    appWindow: T | undefined
    
    setupWindow(): void;
    workDirectory(): string;
}

export class DefaultElectronAppWindow {
    private _window: BrowserWindow | undefined;

    constructor(
        private workingDirectory: string
    ) {
        this._window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                devTools: true,
                nodeIntegration: false,
                contextIsolation: true,
                enableRemoteModule: true,
                preload: path.join(workingDirectory, "preload.js"),
            },
        });
    
        this._window.webContents.openDevTools();
        this._window.loadFile(path.join(workingDirectory, "/index.html"));
    }

    

    get browserWindow(): BrowserWindow | undefined {
        return this._window
    }
}
