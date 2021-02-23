import { bodyConfigs } from "setting/CreepSetting";
import createBodyGetter from "utils/creep/createBodyGetter";

export const harvester: CreepConfig<"harvester"> = {
    prepare: (creep): boolean => {
        const sourceId = creep.memory.data?.sourceId;
        if (!sourceId) {
            creep.room.log("no sourceId", creep.name, true);
            return false;
        }
        const source = Game.getObjectById(sourceId);
        if (!source) {
            creep.room.log("can't find source", creep.name, true);
            return false;
        }
        let target: Source | StructureWithStore | ConstructionSite | null | undefined;
        if (creep.memory.targetId) {
            target = Game.getObjectById(creep.memory.targetId);
        }
        if (!target) {
            const containers = source.pos.findInRange<StructureContainer>(FIND_STRUCTURES, 1, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            });
            if (containers.length > 0) {
                target = containers.find(container => {
                    const stoodCreep = container.pos.lookFor(LOOK_CREEPS);
                    return !(stoodCreep.length > 0 && stoodCreep[0].memory && stoodCreep[0].memory.role === "harvester");
                });
            }
        }
        if (!target) {
            const constructionSite = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                filter: s => s.structureType === STRUCTURE_CONTAINER
            });

            if (constructionSite.length > 0) target = constructionSite[0];
        }
        if (!target) {
            target = source;
        }
        creep.memory.targetId = target.id;
        const range = target instanceof Source ? 1 : 0;
        creep.goTo(target.pos, { range });
        return creep.pos.inRangeTo(target.pos, range);
    },
    source: (creep): boolean => {
        const sourceId = creep.memory.data?.sourceId;
        if (!sourceId) {
            creep.room.log("no sourceId", creep.name, true);
            return false;
        }
        const source = Game.getObjectById(sourceId);
        if (!source) {
            creep.room.log("can't find source", creep.name, true);
            return false;
        }
        creep.say("🚧");
        if (creep.store[RESOURCE_ENERGY] < 20) {
            creep.getEngryFrom(source);
            return false;
        }
        const targetId = creep.memory.targetId;
        if (!targetId) {
            creep.room.log("no targetId", creep.name, true);
            return false;
        }
        const target = Game.getObjectById(targetId);
        if (!target) {
            creep.room.log("can't find target", creep.name, true);
            return false;
        }
        if (target && target instanceof StructureContainer) {
            creep.repair(target);
            return target.hits >= target.hitsMax;
        }
        let constructionSite: ConstructionSite | null | undefined;
        if (!creep.memory.constructionSiteId) {
            creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
        } else {
            constructionSite = Game.getObjectById(creep.memory.constructionSiteId);
        }
        if (!constructionSite)
            constructionSite =
                creep.pos.lookFor(LOOK_CONSTRUCTION_SITES).find(s => s.structureType === STRUCTURE_CONTAINER);
        if (!constructionSite) {
            const container: StructureContainer | undefined =
                creep.pos.lookFor(LOOK_STRUCTURES).find(s => s.structureType === STRUCTURE_CONTAINER) as StructureContainer;
            if (container) {
                creep.room.registerContainer(container);
                return true;
            }
            return false;
        }
        else creep.memory.constructionSiteId = constructionSite?.id;
        if (constructionSite)
            creep.build(constructionSite);
        return false;
    },
    target: (creep): boolean => {
        const sourceId = creep.memory.data?.sourceId;
        if (!sourceId) {
            creep.room.log("no sourceId", creep.name, true);
            return false;
        }
        const source = Game.getObjectById(sourceId);
        if (!source) {
            creep.room.log("can't find source", creep.name, true);
            return false;
        }
        creep.getEngryFrom(source);
        if (!creep.ticksToLive || creep.ticksToLive < 2) creep.drop(RESOURCE_ENERGY);
        return false;
    },
    bodys: createBodyGetter(bodyConfigs.harvester)
};
