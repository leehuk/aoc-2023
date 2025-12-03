"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordGrid = exports.Coord = void 0;
class Coord {
    x;
    y;
    data;
    constructor(x = 0, y = 0, data = null) {
        this.x = x;
        this.y = y;
        this.data = data;
    }
    toString() {
        return "(" + this.x + "," + this.y + ")";
    }
    add(pos) {
        this.x += pos.x;
        this.y += pos.y;
        return this;
    }
    addc(pos) {
        return new Coord(this.x + pos.x, this.y + pos.y);
    }
    sub(pos) {
        this.x -= pos.x;
        this.y -= pos.y;
        return this;
    }
    bounded(xmin, xmax, ymin, ymax) {
        if (this.x >= xmin && this.x <= xmax && this.y >= ymin && this.y <= ymax) {
            return true;
        }
        return false;
    }
    clone() {
        return new Coord(this.x, this.y, this.data);
    }
    distance(to) {
        return new Coord(to.x - this.x, to.y - this.y);
    }
    invert() {
        this.x *= -1;
        this.y *= -1;
        return this;
    }
}
exports.Coord = Coord;
;
const coordVec4 = {
    n: new Coord(0, -1),
    e: new Coord(1, 0),
    s: new Coord(0, 1),
    w: new Coord(-1, 0),
};
const coordVec4Arr = [coordVec4.n, coordVec4.e, coordVec4.s, coordVec4.w];
class CoordStepArray extends Array {
    constructor(values) {
        super();
        this.push(...values);
        return this;
    }
    hasPos(pos) {
        for (let cmp of this.values()) {
            if (cmp.pos === pos) {
                return true;
            }
        }
        return false;
    }
}
;
class CoordGrid {
    coords;
    xmax;
    ymax;
    constructor(data) {
        this.coords = new Array();
        for (let [y, row] of data.entries()) {
            for (let [x, val] of row.entries()) {
                if (this.coords[x] === undefined) {
                    this.coords[x] = new Array();
                }
                this.coords[x][y] = new Coord(x, y, val);
            }
        }
        this.xmax = this.coords.length - 1;
        this.ymax = this.coords[0].length - 1;
    }
    at(pos) {
        return this.coords[pos.x][pos.y];
    }
    bounded(pos) {
        return pos.bounded(0, this.xmax, 0, this.ymax);
    }
    findval(data) {
        let res = [];
        for (let col of this.coords.values()) {
            for (let pos of col.values()) {
                if (pos.data === data) {
                    res.push(pos);
                }
            }
        }
        return res;
    }
    neighs(pos) {
        let neighs = [];
        for (let vec of coordVec4Arr.values()) {
            let newpos = pos.addc(vec);
            if (!this.bounded(newpos)) {
                continue;
            }
            neighs.push(this.at(newpos));
        }
        return neighs;
    }
    walk(from, mode, cbcheck, cbsuccess) {
        let step = {
            pos: from,
            from: from,
            depth: 0,
            neighs: this.neighs(from),
        };
        let path = new CoordStepArray([step]);
        let seenUT = [from];
        let result = 0;
        OUTER: while (path.length > 0) {
            let step = path[path.length - 1];
            if (cbsuccess(step.pos, step.depth)) {
                result++;
                path.pop();
                continue;
            }
            while (step.neighs.length > 0) {
                let neigh = step.neighs.pop();
                if (path.hasPos(neigh) || (mode == "UNIQUE_TARGET" && seenUT.includes(neigh))) {
                    continue;
                }
                if (!cbcheck(step.pos, neigh, step.depth + 1)) {
                    continue;
                }
                let nstep = {
                    pos: neigh,
                    from: step.pos,
                    depth: step.depth + 1,
                    neighs: this.neighs(neigh),
                };
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
exports.CoordGrid = CoordGrid;
