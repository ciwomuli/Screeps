import assignPrototype from "utils/assignPrototype";
import { RoomConsole } from "./RoomConsole";
import { RoomExtention } from "./RoomExtention";

const plugins = [RoomExtention, RoomConsole];
export default function mountRoom(): void {
    plugins.forEach(plugin => assignPrototype(Room, plugin));
}
