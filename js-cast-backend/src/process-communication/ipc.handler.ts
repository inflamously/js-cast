export interface IpcMethod {
    channelName: string;
    listener: (ev: Electron.IpcMainEvent, data: Array<any>) => {}
}

export class IpcHandler {
    
    methods: Array<IpcMethod> | undefined = undefined;
    
    constructor() {

    }

    register() {

    }
}