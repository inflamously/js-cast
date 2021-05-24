const { contextBridge, ipcRenderer } = require("electron");

console.log("Hello World, from preload.js");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  hello: () => console.log("Hello World, preloaded."),
  send: (channel: string, data: any[]) => ipcRenderer.send(channel, data),
  receive: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.on(channel, listener),
});
