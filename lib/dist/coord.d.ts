export declare class Coord {
    x: number;
    y: number;
    data: any;
    constructor(x?: number, y?: number, data?: any);
    toString(): string;
    add(pos: Coord): Coord;
    addc(pos: Coord): Coord;
    sub(pos: Coord): Coord;
    bounded(xmin: number, xmax: number, ymin: number, ymax: number): boolean;
    clone(): Coord;
    distance(to: Coord): Coord;
    invert(): Coord;
}
export declare const coordVec4Arr: Coord[];
export declare const coordVec8Arr: Coord[];
export declare class CoordGrid {
    coords: Coord[][];
    xmax: number;
    ymax: number;
    constructor(data: string[][]);
    at(pos: Coord): Coord;
    bounded(pos: Coord): boolean;
    findval(data: any): Coord[];
    neighs(pos: Coord, vecarr: Coord[]): Coord[];
    walk(from: Coord, mode: "UNIQUE_TARGET" | "UNIQUE_PATH", cbcheck: (from: Coord, to: Coord, depth: number) => boolean, cbsuccess: (pos: Coord, depth: number) => boolean): number;
}
