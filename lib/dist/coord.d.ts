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
interface CoordVec8 {
    n: Coord | undefined;
    ne: Coord | undefined;
    e: Coord | undefined;
    se: Coord | undefined;
    s: Coord | undefined;
    sw: Coord | undefined;
    w: Coord | undefined;
    nw: Coord | undefined;
}
export declare const coordVec4Arr: Coord[];
export declare const coordVec8Arr: Coord[];
export declare class CoordGrid {
    coords: Coord[][];
    edges: Map<Coord, Coord[]>;
    xmax: number;
    ymax: number;
    constructor(data: string[][], xmax?: number, ymax?: number);
    at(pos: Coord): Coord;
    ats(pos: Coord): Coord | undefined;
    bounded(pos: Coord): boolean;
    draw(cbvalue: (pos?: Coord) => string): void;
    drawclear(): void;
    fill(cbfill: () => any): CoordGrid;
    findval(data: any): Coord[];
    moveOverflow(pos: Coord, vec: Coord): Coord;
    neighs(pos: Coord, vecarr: Coord[]): Coord[];
    neighsWithEdge(pos: Coord, vecarr: Coord[]): Coord[];
    neighsVec8(pos: Coord): CoordVec8;
    addEdges(vecarr: Coord[], cbcheck: (from: Coord, to: Coord) => boolean): void;
    hasEdge(from: Coord, to: Coord | undefined): boolean;
    edgeFlood(pos: Coord, vecarr: Coord[]): Set<Coord>;
    walk(from: Coord, mode: "UNIQUE_TARGET" | "UNIQUE_PATH", cbcheck: (from: Coord, to: Coord, depth: number) => boolean, cbsuccess: (pos: Coord, depth: number) => boolean): number;
}
export {};
