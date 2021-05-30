import { ConfigRoot } from "./types/config-root"
import { join } from "path"
import { copyFile } from "fs-extra"

export class AppConfig {
    
    private configurations: Map<string, any>;

    constructor(
        private filepath: string
    ) {
        if (!filepath) {
            throw new Error("AppConfig: Path must be set and not empty.")
        }

        // TODO: Kopiere die Datei in den Ordner und lade sie.
        this.configurations = new Map<string, any>();
        this.setupConfiguration();
    }

    private async setupConfiguration() {
        this.configurations.set("root", require(join(this.filepath, "app-config.file.json")));
    }

    private config(name: string): any | undefined {
        return this.configurations.has(name) ? this.configurations.get(name) : undefined;
    }

    get root(): ConfigRoot | undefined {
        return this.config("root");
    }
}

module.exports = { AppConfig }