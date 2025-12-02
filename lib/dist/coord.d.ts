export declare class Coord {
    x: number;
    y: number;
    data: any;
    constructor(x?: number, y?: number, data?: any);
    toString(): string;
    add(pos: Coord): Coord;
    sub(pos: Coord): Coord;
    bounded(xmin: number, xmax: number, ymin: number, ymax: number): boolean;
    clone(): Coord;
    distance(to: Coord): Coord;
    invert(): Coord;
}
