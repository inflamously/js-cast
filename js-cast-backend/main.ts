import { app, BrowserWindow } from "electron";
import * as path from "path";
import Pong from "./src/debugging/pong";
import { ScriptLoader } from "./src/filesystem/script-loader";

export class Main {
  app: Electron.App = app;
  window: BrowserWindow | undefined = undefined;
  pong: Pong;
  scriptLoader: ScriptLoader;

  constructor() {
    this.pong = new Pong();
    this.scriptLoader = new ScriptLoader();

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
        enableRemoteModule: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    window.webContents.openDevTools();
    window.loadFile(__dirname + "/index.html");

    return window;
  }
}

/* Initialization */
const main = new Main();