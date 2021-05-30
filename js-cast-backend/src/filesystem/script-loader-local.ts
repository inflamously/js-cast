import { ipcMain } from "electron";
import { AppConfig } from "../configuration/app-config";
import { IpcHandler } from "../process-communication/ipc-handler";

export class LocalScriptLoader {

    ipcHandler: IpcHandler;

    constructor(
        private config: AppConfig
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