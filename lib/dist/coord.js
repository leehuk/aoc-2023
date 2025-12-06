"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordGrid = exports.coordVec8Arr = exports.coordVec4Arr = exports.Coord = void 0;
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
;
const coordVecN = new Coord(0, -1);
const coordVecNE = new Coord(1, -1);
const coordVecE = new Coord(1, 0);
const coordVecSE = new Coord(1, 1);
const coordVecS = new Coord(0, 1);
const coordVecSW = new Coord(-1, 1);
const coordVecW = new Coord(-1, 0);
const coordVecNW = new Coord(-1, -1);
exports.coordVec4Arr = [coordVecN, coordVecE, coordVecS, coordVecW];
exports.coordVec8Arr = [coordVecN, coordVecNE, coordVecE, coordVecSE, coordVecS, coordVecSW, coordVecW, coordVecNW];
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
    edges;
    xmax;
    ymax;
    constructor(data, xmax = 0, ymax = 0) {
        this.coords = new Array();
        this.edges = new Map();
        if (data.length > 0) {
            for (let [y, row] of data.entries()) {
                for (let [x, val] of row.entries()) {
                    if (this.coords[x] === undefined) {
                        this.coords[x] = new Array();
                    }
                    this.coords[x][y] = new Coord(x, y, val);
                }
            }
            this.xmax = xmax ? xmax : this.coords.length - 1;
            this.ymax = ymax ? ymax : this.coords[0].length - 1;
        }
        else {
            this.xmax = xmax;
            this.ymax = ymax;
        }
        return this;
    }
    at(pos) {
        return this.coords[pos.x][pos.y];
    }
    ats(pos) {
        if (this.bounded(pos)) {
            return this.coords[pos.x][pos.y];
        }
        return undefined;
    }
    bounded(pos) {
        return pos.bounded(0, this.xmax, 0, this.ymax);
    }
    draw(cbvalue) {
        for (let y = 0; y < this.ymax; y++) {
            for (let x = 0; x < this.xmax; x++) {
                // process.stdout.write(cbvalue((this.coords[x][y] !== undefined) ? this.coords[x][y] : undefined));
                process.stdout.write(cbvalue(this.coords[x][y]));
            }
            process.stdout.write("\n");
        }
    }
    drawclear() {
        process.stdout.write("\x1b[2J\x1b[H");
    }
    fill(cbfill) {
        for (let x = 0; x < this.xmax; x++) {
            this.coords[x] = new Array();
            for (let y = 0; y < this.ymax; y++) {
                this.coords[x][y] = new Coord(x, y, cbfill());
            }
        }
        return this;
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
    moveOverflow(pos, vec) {
        let x = (pos.x + vec.x) % this.xmax;
        let y = (pos.y + vec.y) % this.ymax;
        x += (x < 0) ? this.xmax : 0;
        y += (y < 0) ? this.ymax : 0;
        return this.coords[x][y];
    }
    neighs(pos, vecarr) {
        let neighs = [];
        for (let vec of vecarr.values()) {
            let newpos = pos.addc(vec);
            if (!this.bounded(newpos)) {
                continue;
            }
            neighs.push(this.at(newpos));
        }
        return neighs;
    }
    neighsWithEdge(pos, vecarr) {
        return this.neighs(pos, vecarr).filter(neigh => this.hasEdge(pos, neigh));
    }
    neighsVec8(pos) {
        return {
            n: this.ats(pos.addc(coordVecN)),
            ne: this.ats(pos.addc(coordVecNE)),
            e: this.ats(pos.addc(coordVecE)),
            se: this.ats(pos.addc(coordVecSE)),
            s: this.ats(pos.addc(coordVecS)),
            sw: this.ats(pos.addc(coordVecSW)),
            w: this.ats(pos.addc(coordVecW)),
            nw: this.ats(pos.addc(coordVecNW)),
        };
    }
    addEdges(vecarr, cbcheck) {
        this.coords.forEach(col => col.forEach(pos => {
            let edges = [];
            this.neighs(pos, vecarr).forEach(neigh => {
                if (cbcheck(pos, neigh)) {
                    edges.push(neigh);
                }
            });
            if (edges.length > 0) {
                this.edges.set(pos, edges);
            }
        }));
    }
    hasEdge(from, to) {
        return ((to === undefined) ? false : (this.edges.get(from)?.includes(to) === true) ? true : false);
    }
    // 2024-12
    edgeFlood(pos, vecarr) {
        let res = new Set();
        let queue = new Set();
        queue.add(pos);
        for (const wkpos of queue) {
            res.add(wkpos);
            this.neighsWithEdge(wkpos, vecarr).forEach(neigh => { queue.add(neigh); });
        }
        return res;
    }
    // 2024-10
    walk(from, mode, cbcheck, cbsuccess) {
        let step = {
            pos: from,
            from: from,
            depth: 0,
            neighs: this.neighs(from, exports.coordVec4Arr),
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
                    neighs: this.neighs(neigh, exports.coordVec4Arr),
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
