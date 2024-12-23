export interface VecPos {
    row: number;
    col: number;
}
export interface VecCardinal {
    n: VecAdjust;
    ne: VecAdjust;
    e: VecAdjust;
    se: VecAdjust;
    s: VecAdjust;
    sw: VecAdjust;
    w: VecAdjust;
    nw: VecAdjust;
}
export interface VecAdjust {
    rowadj: number;
    coladj: number;
}
export declare const vecAdjustTable: VecCardinal;
export declare function vecdata(vec: VecPos, data: any[][]): any;
export declare function vecdataat(vec: VecPos, data: any[][], dir: keyof VecCardinal): any;
export declare function vecdirs(): string[];
export declare function vecinit(row: number, col: number): VecPos;
export declare function vecp(vec: VecPos): string;
export declare function vecmove(vec: VecPos, data: any[][], dir: keyof VecCardinal): boolean;
