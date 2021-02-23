interface DpNode {
    len: number;
    swamp: number;
}
const ROOM_MAX_SIZE = 50;
function getPreArea(
    dp: DpNode[][],
    i: number,
    j: number,
    len: number
): { topLeft: DpNode, top: DpNode, left: DpNode } {
    const nullNode = { len: 0, swamp: 0 };
    return {
        topLeft: i - len > -1 && j - len > -1 ? dp[i - len][j - len] : nullNode,
        top: i - len > -1 ? dp[i - len][j] : nullNode,
        left: j - len > -1 ? dp[i][j - len] : nullNode
    };
}

function getCenterByBottomRight(i: number, j: number, len: number): [number, number] {
    return [i - len / 2 + 0.5, j - len / 2 + 0.5];
}

export function findbaseCenterPos(roomName: string, baseSize = 11): RoomPosition[] {
    const terrain = new Room.Terrain(roomName);
    const dp: DpNode[][] = Array(ROOM_MAX_SIZE).fill(Array(ROOM_MAX_SIZE));
    let res: RoomPosition[] = [];
    let minSwamp = Infinity;
    for (let i = 0; i < ROOM_MAX_SIZE; i++) {
        for (let j = 0; j < ROOM_MAX_SIZE; j++) {
            const { topLeft, top, left } = getPreArea(dp, i, j, 1);
            dp[i][j] = {
                len: terrain.get(j, i) === TERRAIN_MASK_WALL ? 0 : Math.min(topLeft.len, top.len, left.len) + 1,
                swamp: top.swamp + left.swamp - topLeft.swamp + (terrain.get(j, i) === TERRAIN_MASK_SWAMP ? 1 : 0)
            }
            if (dp[i][j].len >= baseSize) {
                const { topLeft, top, left } = getPreArea(dp, i, j, baseSize);
                const currentSwamp = dp[i][j].swamp - top.swamp - left.swamp + topLeft.swamp;
                if (currentSwamp > minSwamp) continue;
                const pos = getCenterByBottomRight(i, j, baseSize);
                const centerPos = new RoomPosition(pos[1], pos[0], roomName);
                if (currentSwamp < minSwamp) {
                    minSwamp = currentSwamp;
                    res = [centerPos];
                } else {
                    res.push(centerPos);
                }
            }
        }
    }
    return res;
}

export function confirmBasePos(room: Room, targetPos: RoomPosition[]): RoomPosition | undefined {
    if (!targetPos || targetPos.length <= 0) return undefined;
    const controller = room.controller;
    const mineral = room.mineral;
    if (!controller || !mineral) return undefined;
    const target = _.min(targetPos.map((pos, index) => ({
        distance: pos.findPathTo(controller).length + pos.findPathTo(mineral).length,
        index
    })), item => item.distance);
    return targetPos[target.index];
}

export function setBaseCenter(room: Room, center: RoomPosition): OK | ERR_INVALID_ARGS {
    if (!center) return ERR_INVALID_ARGS;
    room.memory.center = [center.x, center.y];
    return OK;
}
