import { BrowserWindow } from "electron";
import { DefaultElectronAppWindow, ElectronAppWindow } from "./electron-app-window";

export type ElectronAppEventHandlerActionTypes = 
  "READY"
  | "ACTIVATE"
  | "QUIT_MAC_OS";

export type ElectronAppEventHandlerListener = () => void
export type ElectronAppEventHandlerListenerObject = { [key in ElectronAppEventHandlerActionTypes]: Array<ElectronAppEventHandlerListener> }

export interface ElectronAppEventHandler<T> {
    appEventHandler: T | undefined

    setupEventHandler(): void;
}

export class DefaultElectronAppEventHandler {
    
    private _browserWindow: BrowserWindow | undefined
    private _listeners: ElectronAppEventHandlerListenerObject = {
      READY: [],
      ACTIVATE: [],
      QUIT_MAC_OS: []
    }

    constructor(
        private app: Electron.App,
        private appWindow: ElectronAppWindow<any>
    ) {
      if (!app || !appWindow) {
        throw new Error("DefaultElectronAppEventHandler: Event registration failed due to missing parameters.");
      }

      if (appWindow instanceof DefaultElectronAppWindow) {
        this._browserWindow = appWindow.browserWindow
      }

      this.createWindowOnReady();
      this.createWindowOnActive();
      this.quitOnClose();
  }

  get listeners(): ElectronAppEventHandlerListenerObject {
    return this._listeners
  }

  private executeListeners(listeners: Array<ElectronAppEventHandlerListener>) {
    if (listeners && 
        listeners.length > 0) {
      listeners.forEach(l => l());
    }
  }

  createWindowOnReady() {
    this.app.whenReady().then(() => {
      this.appWindow.setupWindow();

      this.executeListeners(this._listeners.READY);
    });
  }

  createWindowOnActive() {
    this.app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.appWindow.setupWindow();
        
        this.executeListeners(this._listeners.ACTIVATE);
      }
    });
  }

  quitOnClose() {
    this.app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        this.executeListeners(this._listeners.READY);

        this.app.quit();
      }
    });
  }
}