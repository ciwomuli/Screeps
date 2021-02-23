export class CreepExtention extends Creep{
    goTo(target: RoomPosition, moveOpt?: MoveOpt): ScreepsReturnCode{
        return this.moveTo(target,moveOpt as MoveToOpts);
    }
    getEngryFrom(target: Structure | Source | Ruin | Resource<RESOURCE_ENERGY>): ScreepsReturnCode{
        if(target instanceof Source){
            return this.harvest(target);
        }
        else return ERR_INVALID_TARGET;
    }
}
