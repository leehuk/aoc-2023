export class Coord {
    x: number;
    y: number;
    data: any;

    constructor(x = 0, y = 0, data : any = null) {
        this.x = x;
        this.y = y;
        this.data = data;
    }

    public toString(): string {
        return "(" + this.x + "," + this.y + ")";
    }

    add(pos: Coord): Coord {
        this.x += pos.x;
        this.y += pos.y;
        return this;
    }

    addc(pos: Coord): Coord {
        return new Coord(this.x + pos.x, this.y + pos.y);
    }

    sub(pos: Coord): Coord {
        this.x -= pos.x;
        this.y -= pos.y;
        return this;
    }

    bounded(xmin: number, xmax: number, ymin: number, ymax: number): boolean {
        if(this.x >= xmin && this.x <= xmax && this.y >= ymin && this.y <= ymax) {
            return true;
        }

        return false;
    }

    clone(): Coord {
        return new Coord(this.x, this.y, this.data);
    }

    distance(to: Coord): Coord {
        return new Coord(to.x - this.x, to.y - this.y);
    }

    invert(): Coord {
        this.x *= -1;
        this.y *= -1;
        return this;
    }
};

const coordVecN: Coord = new Coord(0, -1);
const coordVecNE: Coord = new Coord(1, -1);
const coordVecE: Coord = new Coord(1, 0);
const coordVecSE: Coord = new Coord(1, 1);
const coordVecS: Coord = new Coord(0, 1);
const coordVecSW: Coord = new Coord(-1, 1);
const coordVecW: Coord = new Coord(-1, 0);
const coordVecNW: Coord = new Coord(-1, -1);

export const coordVec4Arr: Coord[] = [coordVecN, coordVecE, coordVecS, coordVecW];
export const coordVec8Arr: Coord[] = [coordVecN, coordVecNE, coordVecE, coordVecSE, coordVecS, coordVecSW, coordVecW, coordVecNW];

interface CoordStep {
    pos: Coord;
    from: Coord;
    depth: number;
    neighs: Coord[];
}

class CoordStepArray extends Array<CoordStep> {
    constructor(values: CoordStep[]) {
        super();
        this.push(...values);
        return this;
    }

    hasPos(pos: Coord): boolean {
        for(let cmp of this.values()) {
            if(cmp.pos === pos) {
                return true;
            }
        }

        return false;
    }
};

export class CoordGrid {
    coords: Coord[][];
    xmax: number;
    ymax: number;

    constructor(data: string[][]) {
        this.coords = new Array();

        for(let [y, row] of data.entries()) {
            for(let [x, val] of row.entries()) {
                if(this.coords[x] === undefined) {
                    this.coords[x] = new Array();
                }
                this.coords[x][y] = new Coord(x, y, val);
            }
        }

        this.xmax = this.coords.length - 1;
        this.ymax = this.coords[0].length - 1;
    }

    at(pos: Coord): Coord {
        return this.coords[pos.x][pos.y];
    }

    bounded(pos: Coord): boolean {
        return pos.bounded(0, this.xmax, 0, this.ymax);
    }

    findval(data: any) {
        let res : Coord[] = [];
        for(let col of this.coords.values()) {
            for(let pos of col.values()) {
                if(pos.data === data) {
                    res.push(pos);
                }
            }
        }

        return res;
    }

    neighs(pos: Coord, vecarr: Coord[]): Coord[] {
        let neighs : Coord[] = [];

        for(let vec of vecarr.values()) {
            let newpos = pos.addc(vec);
            if(!this.bounded(newpos)) {
                continue;
            }

            neighs.push(this.at(newpos));
        }

        return neighs;
    }

    // 2024-10
    walk(from: Coord, mode: "UNIQUE_TARGET"|"UNIQUE_PATH", cbcheck: (from: Coord, to: Coord, depth: number) => boolean, cbsuccess: (pos: Coord, depth: number) => boolean) : number {
        let step : CoordStep = {
            pos: from,
            from: from,
            depth: 0,
            neighs: this.neighs(from, coordVec4Arr),
        }

        let path = new CoordStepArray([step]);
        let seenUT : Coord[] = [from];
        let result = 0;

        OUTER: while(path.length > 0) {
            let step = path[path.length-1];

            if(cbsuccess(step.pos, step.depth)) {
                result++;
                path.pop();
                continue;
            }

            while(step.neighs.length > 0) {
                let neigh = step.neighs.pop()!;

                if(path.hasPos(neigh) || (mode == "UNIQUE_TARGET" && seenUT.includes(neigh))) {
                    continue;
                }

                if(!cbcheck(step.pos, neigh, step.depth + 1)) {
                    continue;
                }

                let nstep : CoordStep = {
                    pos: neigh,
                    from: step.pos,
                    depth: step.depth + 1,
                    neighs: this.neighs(neigh, coordVec4Arr),
                }

                path.push(nstep);
                seenUT.push(neigh);

                continue OUTER;
            }

            // nothing to be found from this location
            path.pop();
        }

        return result;
    }
}