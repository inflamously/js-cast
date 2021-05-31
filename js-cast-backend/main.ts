import { app, BrowserWindow } from "electron";
import { copyFile } from 'fs'
import * as path from "path";
import { AppConfig, DefaultAppConfig } from "./src/configuration/app-config";
import Pong from "./src/debugging/pong";
import { DefaultScriptLoader, ScriptLoader } from "./src/scripting/script-loader";
import { DefaultElectronAppWindow, ElectronAppWindow } from "./src/interactive-browser-window/electron-app-window";

export class Main implements 
    AppConfig<DefaultAppConfig>, 
    ScriptLoader<DefaultScriptLoader>, 
    ElectronAppWindow<DefaultElectronAppWindow> {
  app: Electron.App = app;
  appWindow: DefaultElectronAppWindow | undefined;
  pong: Pong;
  scriptLoader: DefaultScriptLoader | undefined;
  config: DefaultAppConfig | undefined;

  constructor() {
    this.pong = new Pong();
    this.setupConfig();
    this.setupScriptLoader();

    this.initializeWhenReady();
    this.showOnActivate();
    this.quitOnDestruction();
  }

  initializeWhenReady() {
    this.app.whenReady().then(() => {
      this.setupWindow();
    });
  }

  showOnActivate() {
    this.app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.setupWindow();
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

  workDirectory(): string {
    return __dirname
  }

  setupWindow(): void {
    this.appWindow = new DefaultElectronAppWindow(this.workDirectory());
  }

  setupScriptLoader(): DefaultScriptLoader {
    return new DefaultScriptLoader(this.config as DefaultAppConfig);
  }

  async setupConfig(): Promise<void> {
    const userDataPath = this.app.getPath("userData");
    const localConfigFile = path.join(".", "assets", "app-config.file.json");

    await copyFile(localConfigFile, path.join(userDataPath, "app-config.file.json"), () => {})

    this.config = await new Promise((resolve, reject) => {
      resolve(new DefaultAppConfig(userDataPath))
      reject(undefined)
    });
  }
}

/* Initialization */
const main = new Main();