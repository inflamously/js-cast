import { DefaultAppConfig } from "../configuration/app-config";
import { LocalScriptLoader } from "./script-loader-local";

export interface ScriptLoader<T> {
    scriptLoader: T | undefined;

    setupScriptLoader(): void;
}

export class DefaultScriptLoader {
    local: LocalScriptLoader;
    cloud: undefined;

    constructor(
        private config: DefaultAppConfig,
    ) {
        this.local = new LocalScriptLoader(config);
    }
}