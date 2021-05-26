import { IpcHandler, IpcMethod } from "./ipc.handler";
import { Application } from 'spectron'
import electron, { ipcMain } from 'electron'

describe("integration test with electron", () => {
    jest.setTimeout(10000);

    let ipcHandler: IpcHandler;
    let ipcMethod: IpcMethod;
    let app: Application;

    beforeAll(() => {
        app = new Application({
            path: electron as unknown as string,
            args: ['../dist/main.js'],
        });
        ipcHandler;
        ipcMethod = {
            channelName: "ping-pong",
            listener: (ev, data) => {
                ev.reply("Hello World.");
                console.log(data);
            }
        };
    })

    beforeEach(async () => {
        if (app && !app.isRunning()) {
            await app.start();
        }
    })

    afterEach(async () => {
        if (app && app.isRunning()) {
            await app.stop();
        }
    })

    test("should run electron instancen and check window count", async () => {
        const count = await app.client.getWindowCount();
        expect(count).toBeGreaterThan(0);
    })

    test("should send message to ipc method", () => {
        ipcHandler = new IpcHandler(ipcMain);
    })
})