import { app, dialog } from "electron";
import { copyFile } from 'fs'
import * as path from "path";
import { AppConfig, DefaultAppConfig } from "./src/configuration/app-config";
import Pong from "./src/debugging/pong";
import { DefaultScriptLoader, ScriptLoader } from "./src/scripting/script-loader";
import { DefaultElectronAppWindow, ElectronAppWindow } from "./src/window-interaction/electron-app-window";
import { PromiseCatch } from "./src/error-handling/catcher";
import { DefaultElectronAppEventHandler, ElectronAppEventHandler } from "./src/window-interaction/electron-app-events";

export class Main implements 
    AppConfig<DefaultAppConfig>, 
    ScriptLoader<DefaultScriptLoader>, 
    ElectronAppWindow<DefaultElectronAppWindow>,
    ElectronAppEventHandler<DefaultElectronAppEventHandler>,
    PromiseCatch {
  app: Electron.App = app;
  appWindow: DefaultElectronAppWindow | undefined;
  appEventHandler: DefaultElectronAppEventHandler | undefined;
  pong: Pong;
  scriptLoader: DefaultScriptLoader | undefined;
  config: DefaultAppConfig | undefined;

  constructor() {
    this.pong = new Pong();
    this.setupEventHandler();
    this.setupScriptLoader();
    this.catch(this.setupConfig());

    this.appEventHandler?.listeners.READY.push(() => { console.log("APP READY") });
  }

  catch(promise: Promise<any>): void {
    promise.catch((_) => { 
      const window = this.appWindow?.browserWindow
      if (window) {
        dialog.showMessageBox(window, {
          title: "Main",
          message: "Application failed to instantiate properly."
        }) 
      }
    });
  }

  workDirectory(): string {
    return __dirname
  }

  setupWindow(): void {
    this.appWindow = new DefaultElectronAppWindow(this.workDirectory());
  }

  setupScriptLoader(): void {
    this.scriptLoader = new DefaultScriptLoader(this.config as DefaultAppConfig);
  }

  setupEventHandler(): void {
    this.appEventHandler = new DefaultElectronAppEventHandler(
      this.app,
      this
    )
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