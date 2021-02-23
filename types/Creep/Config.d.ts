interface CreepConfig<Role extends CreepRoleConstant> {
    prepare?: (creep: Creep<Role>) => boolean;
    source?: (creep: Creep<Role>) => boolean;
    target?: (creep: Creep<Role>) => boolean;
    bodys?: (room: Room, spawn: StructureSpawn, data: RoleDatas[Role]) => BodyPartConstant[];
}
