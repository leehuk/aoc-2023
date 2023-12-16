export interface RCPathOption {
    north: RCPathAdjust,
    east: RCPathAdjust,
    south: RCPathAdjust,
    west: RCPathAdjust
};
export interface RCPathAdjust {
    rowadj: number,
    coladj: number
};
export const rcPath: RCPathOption = {
    north: { rowadj: -1, coladj: 0 },
    east: { rowadj: 0, coladj: 1 },
    south: { rowadj: 1, coladj: 0 },
    west: { rowadj: 0, coladj: -1 }
}

export function rcrowadj(dir: keyof RCPathOption): number {
    return rcPath[dir]['rowadj'];
}
export function rccoladj(dir: keyof RCPathOption): number {
    return rcPath[dir]['coladj'];
}