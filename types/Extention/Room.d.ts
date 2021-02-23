interface Room {
    log(content: string, instanceName: string, notify: boolean): OK;
    registerContainer(container: StructureContainer): OK;
    mineral?: Mineral;
}
