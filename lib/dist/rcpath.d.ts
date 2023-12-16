export interface RCPathOption {
    north: RCPathAdjust;
    east: RCPathAdjust;
    south: RCPathAdjust;
    west: RCPathAdjust;
}
export interface RCPathAdjust {
    rowadj: number;
    coladj: number;
}
export declare const rcPath: RCPathOption;
export declare function rcrowadj(dir: keyof RCPathOption): number;
export declare function rccoladj(dir: keyof RCPathOption): number;
