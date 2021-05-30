import { app, BrowserWindow } from "electron";
import { copyFile } from 'fs'
import * as path from "path";
import { AppConfig } from "./src/configuration/app-config";
import Pong from "./src/debugging/pong";
import { ScriptLoader } from "./src/filesystem/script-loader";

export class Main {
  app: Electron.App = app;
  window: BrowserWindow | undefined = undefined;
  pong: Pong;
  scriptLoader: ScriptLoader;
  config: AppConfig | undefined;

  constructor() {
    this.pong = new Pong();
    this.setupAppConfig().then((config) => this.config = config);
    this.scriptLoader = this.setupScriptLoader();

    this.initializeWhenReady();
    this.showOnActivate();
    this.quitOnDestruction();
  }

  initializeWhenReady() {
    this.app.whenReady().then(() => {
      this.window = this.createWindow();
    });
  }

  showOnActivate() {
    this.app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.window = this.createWindow();
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

  createWindow(): BrowserWindow {
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

  setupScriptLoader(): ScriptLoader {
    return new ScriptLoader(this.config as AppConfig);
  }

  async setupAppConfig(): Promise<AppConfig> {
    const userDataPath = this.app.getPath("userData");
    const localConfigFile = path.join(".", "assets", "app-config.file.json");
    // TODO: move into appConfig as static method.
    await copyFile(localConfigFile, path.join(userDataPath, "app-config.file.json"), () => {})

    return await new Promise((resolve, reject) => {
      resolve(new AppConfig(userDataPath))
      reject(undefined)
    });
  }
}

/* Initialization */
const main = new Main();