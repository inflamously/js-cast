import { app, BrowserWindow } from "electron";
import * as path from "path";
import Pong from "./src/debugging/pong";

export class Main {
  app: Electron.App = app;
  window: BrowserWindow | undefined = undefined;

  constructor() {
    this.initializeWhenReady();
    this.showOnActivate();
    this.quitOnDestruction();
  }

  initializeWhenReady() {
    this.app.whenReady().then(() => {
      this.window = this.newWindow();
    });
  }

  showOnActivate() {
    this.app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.window = this.newWindow();
      }
    });
  }

  quitOnDestruction() {
    this.app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }

  newWindow(): BrowserWindow {
    const window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        devTools: true,
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    window.webContents.openDevTools();
    window.loadFile(__dirname + "/index.html");

    return window;
  }
}

const pong = new Pong();
const main = new Main();
