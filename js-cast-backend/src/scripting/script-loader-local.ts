import { ipcMain } from "electron";
import { DefaultAppConfig } from "../configuration/app-config";
import { IpcHandler } from "../process-communication/ipc-handler";

export class LocalScriptLoader {

    ipcHandler: IpcHandler;

    constructor(
        private config: DefaultAppConfig
    ) {
        this.ipcHandler = new IpcHandler(ipcMain);
    }

    registerHandlers() {
        this.ipcHandler.register({
            channelName: '',
            listener: (ev, data) => {
                
            }
        })
    }
}