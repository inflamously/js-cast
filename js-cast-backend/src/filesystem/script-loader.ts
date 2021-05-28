import { LocalScriptLoader } from "./script-loader-local";

export class ScriptLoader {
    local: LocalScriptLoader;
    cloud: undefined;

    constructor() {
        this.local = new LocalScriptLoader();
    }
}