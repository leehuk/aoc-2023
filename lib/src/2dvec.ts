export interface VecCardinal {
    n: any,
    ne: any,
    e: any,
    se: any,
    s: any,
    sw: any,
    w: any,
    nw: any,
};
export interface VecDir {
    dir: keyof VecCardinal,
};
export interface VecPos {
    row: number,
    col: number,
};

const vecAdjustTable: VecCardinal = {
    n: { row: -1, col: 0 } as VecPos,
    ne: { row: -1, col: 1 } as VecPos,
    e: { row: 0, col: 1 } as VecPos,
    se: { row: 1, col: 1 } as VecPos,
    s: { row: 1, col: 0 } as VecPos,
    sw: { row: 1, col: -1 } as VecPos,
    w: { row: 0, col: -1 } as VecPos,
    nw: { row: -1, col: -1 } as VecPos,
};
const vecDegreeTable: VecCardinal = {
    n: 0,
    ne: 45,
    e: 90,
    se: 135,
    s: 180,
    sw: 225,
    w: 270,
    nw: 315,
};

export function degrotate(dir: VecDir, rot: number): boolean {
    let deg = vecDegreeTable[dir.dir] + rot;

    while(deg >= 360) {
        deg -= 360;
    }
    while(deg < 0) {
        deg += 360;
    }

    for(const [key,value] of Object.entries(vecDegreeTable)) {
        if(deg == value) {
            dir.dir = key as keyof VecCardinal;
            return true;
        }
    }

    return false;
}

export function vecclone(vec: VecPos): VecPos {
    return { row: vec.row, col: vec.col } as VecPos;
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

export function veclocate(data: any[][], matcher: any): VecPos|false {
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if(data[i][j] === matcher) {
                return { row: i, col: j } as VecPos;
            }
        }
    }

    return false;
}

export function vecmove(vec: VecPos, data: any[][], dir: keyof VecCardinal): boolean {
    let nrow = vec['row'] + vecAdjustTable[dir]['row'];
    let ncol = vec['col'] + vecAdjustTable[dir]['col'];

    if(nrow < 0 || nrow >= data.length || ncol < 0 || ncol >= data[0].length) {
        return false;
    }

    vec['row'] = nrow;
    vec['col'] = ncol;

    return true;
}

