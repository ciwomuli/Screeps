export default function createBodyGetter(
    bodyConfig: BodyConfig
): (room: Room, spawn: StructureSpawn) => BodyPartConstant[] {
    return (room: Room, spawn: StructureSpawn): BodyPartConstant[] => {
        const targetLevel = Object.keys(bodyConfig)
            .reverse().find(level => {
                return Number(level) <= room.energyAvailable && spawn.spawnCreep(bodyConfig[level as EnergyLevel], "bodyTester", { dryRun: true });
            })
        if (!targetLevel) return [];
        return bodyConfig[targetLevel as EnergyLevel];;
    }
}
