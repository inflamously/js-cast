import { IpcHandler } from "./ipc.handler"

describe("electron process communication tests", () => {
    test("should initialize ipc-handler", () => {
        const handler = new IpcHandler();
        expect(handler).toBeTruthy()
        expect(undefined).toBeTruthy()
    })
})

test("should initialize ipc-handler", () => {
    const handler = new IpcHandler();
    expect(handler).toBeTruthy()
    expect(undefined).toBeTruthy()
})