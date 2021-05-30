import { AppConfig } from "../configuration/app-config";
import { LocalScriptLoader } from "./script-loader-local";

export class ScriptLoader {
    local: LocalScriptLoader;
    cloud: undefined;

    constructor(
        private config: AppConfig,
    ) {
        this.local = new LocalScriptLoader(config);
    }
}