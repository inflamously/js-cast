import { IpcHandler } from "./ipc.handler"

test("should initialize ipc-handler", () => {
    const handler = new IpcHandler();
    expect(handler).toBeTruthy()
})