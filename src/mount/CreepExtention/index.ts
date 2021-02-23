import assignPrototype from "utils/assignPrototype";
import { CreepExtention } from "./CreepExtention";

const plugins = [CreepExtention];
export default function mountRoom(): void {
    plugins.forEach(plugin => assignPrototype(Creep, plugin));
}
