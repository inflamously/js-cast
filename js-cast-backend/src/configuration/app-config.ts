import { ConfigRoot } from "./types/config-root"

export class AppConfig {
    
    private static instance = new AppConfig();
    private configurations: Map<string, any>;

    constructor() {
        console.log(__dirname);
        this.configurations = new Map<string, any>();
        // this.configurations.set("root", require("./app-config.file.json"));
    }

    static get root(): ConfigRoot {
        return AppConfig.instance.configurations.get("root");
    }
}

module.exports = { AppConfig }