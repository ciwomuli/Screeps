interface CreepMemory<Role extends CreepRoleConstant = CreepRoleConstant> {
    role?: CreepRoleConstant;
    data?: RoleDatas[Role];
    targetId?: Id<Source | StructureWithStore | ConstructionSite>;
    constructionSiteId?: Id<ConstructionSite>;
}
