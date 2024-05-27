
export enum Camadas {
    deforastationLastMonth,
    landCover,
    deforastationLast10Years,
    undergroundCarbonStorage,
    speciesDiversity,
    carOverlap,
    mining,
}

export enum Esferas {
    Estadual,
    Federal,
}

type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>

export type JSONObject = {
    [x: string]: JSONValue
}
