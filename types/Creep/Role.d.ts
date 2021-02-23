
type CreepRoleConstant = keyof RoleDatas;

type CreepData = RoleDatas[CreepRoleConstant];

interface RoleDatas {
    harvester: HarvesterData;
}

interface HarvesterData {
    sourceId: Id<Source>;
    targetId: Id<EnergySourceStructure>;
}
