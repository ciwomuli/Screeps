import log from "utils/console/log";
import { RoomExtention } from "./RoomExtention";

export class RoomConsole extends RoomExtention {
    public log(content: string, instanceName = "", notify = false): OK {
        const roomName = this.name;
        const prefixes = instanceName ? [roomName, instanceName] : [roomName];
        return log(content, prefixes, notify);
    }
}
