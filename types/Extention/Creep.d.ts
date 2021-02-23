interface Creep<Role extends CreepRoleConstant = CreepRoleConstant>{
    goTo(target: RoomPosition, moveOpt?: MoveOpt): ScreepsReturnCode;
    getEngryFrom(target: Structure | Source | Ruin | Resource<RESOURCE_ENERGY>): ScreepsReturnCode;
}
