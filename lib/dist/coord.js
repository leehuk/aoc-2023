"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coord = void 0;
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
