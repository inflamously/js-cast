import { ipcMain } from "electron";
import { IpcHandler, IpcMethod } from "./ipc-handler"

describe("process-communication testing", () => {
    let ipcHandler: IpcHandler;
    let ipcMethod: IpcMethod = {
        channelName: "ping-pong",
        listener: (ev, data) => {
            ev.reply("Hello World.");
            console.log(data);
        }
    }
    
    beforeEach(() => {
        ipcHandler = new IpcHandler(ipcMain);
    })
    
    test("should initialize valid ipc-handler instance", () => {
        expect(ipcHandler).toBeTruthy()
    })

    test("should register an ipc method", () => {
        ipcHandler.register(ipcMethod);
        expect(ipcHandler.methods).toContain(ipcMethod);
    })
})