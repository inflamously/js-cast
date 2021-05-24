import { ipcMain } from "electron";

export default class Pong {
    constructor() {
        ipcMain.on("ping", (ev, data) => {
            console.log(data);
        
            ev.reply("pong", "");
        });
    }
}