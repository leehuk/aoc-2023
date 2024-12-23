export interface VecPos {
    row: number,
    col: number,
};
export interface VecCardinal {
    n: VecAdjust,
    ne: VecAdjust,
    e: VecAdjust,
    se: VecAdjust,
    s: VecAdjust,
    sw: VecAdjust,
    w: VecAdjust,
    nw: VecAdjust,
};
export interface VecAdjust {
    rowadj: number,
    coladj: number
};
export const vecAdjustTable: VecCardinal = {
    n: { rowadj: -1, coladj: 0 },
    ne: { rowadj: -1, coladj: 1 },
    e: { rowadj: 0, coladj: 1 },
    se: { rowadj: 1, coladj: 1 },
    s: { rowadj: 1, coladj: 0 },
    sw: { rowadj: 1, coladj: -1 },
    w: { rowadj: 0, coladj: -1 },
    nw: { rowadj: -1, coladj: -1 },
}

export function vecdata(vec: VecPos, data: any[][]): any {
    return data[vec['row']][vec['col']];
}

export function vecdataat(vec: VecPos, data: any[][], dir: keyof VecCardinal): any {
    let nvec = { row: vec['row'], col: vec['col'] } as VecPos;

    if(!vecmove(nvec, data, dir)) {
        return false;
    }

    return vecdata(nvec, data);
}

export function vecdirs(): string[] {
    return Object.keys(vecAdjustTable);
}

export function vecinit(row: number, col: number): VecPos {
    return { row: row, col: col } as VecPos;
}

export function vecp(vec: VecPos): string {
    return vec['row'] + "," + vec['col'];
}

export function vecmove(vec: VecPos, data: any[][], dir: keyof VecCardinal): boolean {
    let nrow = vec['row'] + vecAdjustTable[dir]['rowadj'];
    let ncol = vec['col'] + vecAdjustTable[dir]['coladj'];

    if(nrow < 0 || nrow >= data.length || ncol < 0 || ncol >= data[0].length) {
        return false;
    }

    vec['row'] = nrow;
    vec['col'] = ncol;

    return true;
}

