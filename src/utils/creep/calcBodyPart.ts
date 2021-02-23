export default function calcBodyPart(bodySet: BodySet): BodyPartConstant[] {
    const bodys = Object.keys(bodySet)
        .map(
            type => Array(bodySet[type as BodyPartConstant]).fill(type) as BodyPartConstant[]
        );
    return ([] as BodyPartConstant[]).concat(...bodys);
}
