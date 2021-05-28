import { ConfigKeyValuePair } from "./config-keyvalue-pair";

export interface ConfigFilesystem {
    path: Array<ConfigKeyValuePair>
}