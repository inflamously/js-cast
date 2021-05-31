import { ConfigRoot } from "./types/config-root"
import { join } from "path"
import { existsSync } from "fs"

export interface AppConfig<T> {
    config: T | undefined

    setupConfig(): Promise<void>;
};

export class DefaultAppConfig {
    
    private configurationFilepath = join(this.filepath, "app-config.file.json")
    private configurations: Map<string, any>;

    constructor(
        private filepath: string
    ) {
        if (!filepath) {
            throw new Error("AppConfig: Configuration filepath needs to be setup.")
        }

        // TODO: Kopiere die Datei in den Ordner und lade sie.
        this.checkup();
        this.configurations = new Map<string, any>();
        this.setup();
    }

    checkup() {
        if (!existsSync(this.configurationFilepath)) {
            throw new Error("AppConfig: Cannot run without configuration file   .")
        }
    }

    private async setup() {
        this.configurations.set("root", require(this.configurationFilepath));
    }

    private config(name: string): any | undefined {
        return this.configurations.has(name) ? this.configurations.get(name) : undefined;
    }

    get root(): ConfigRoot | undefined {
        return this.config("root");
    }
}