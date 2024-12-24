export interface VecCardinal {
    n: any;
    ne: any;
    e: any;
    se: any;
    s: any;
    sw: any;
    w: any;
    nw: any;
}
export interface VecDir {
    dir: keyof VecCardinal;
}
export interface VecPos {
    row: number;
    col: number;
}
export declare function degrotate(dir: VecDir, rot: number): boolean;
export declare function vecdata(vec: VecPos, data: any[][]): any;
export declare function vecdataat(vec: VecPos, data: any[][], dir: keyof VecCardinal): any;
export declare function vecdirs(): string[];
export declare function vecinit(row: number, col: number): VecPos;
export declare function vecp(vec: VecPos): string;
export declare function veclocate(data: any[][], matcher: any): VecPos | false;
export declare function vecmove(vec: VecPos, data: any[][], dir: keyof VecCardinal): boolean;
