import { IpcMain } from 'electron';

export interface IpcMethod {
    channelName: string;
    listener: (ev: Electron.IpcMainEvent, data: Array<any>) => void
}

export class IpcHandler {
    
    private _methods: IpcMethod[];
    private _ipc: IpcMain;
    
    get methods(): IpcMethod[] {
        return Array.from(this._methods)
    }

    constructor(ipcMain: Electron.IpcMain) {
        this._ipc = ipcMain;
        this._methods = [];
    }

    register(ipcMethod: IpcMethod) {
        this._methods.push(ipcMethod);
    }

    setoff() {
        this._methods.forEach(m => {
            this._ipc.on(m.channelName, m.listener);
        })
    }
}