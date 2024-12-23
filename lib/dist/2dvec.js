"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vecmove = exports.vecp = exports.vecinit = exports.vecdirs = exports.vecdataat = exports.vecdata = exports.vecAdjustTable = void 0;
;
;
;
exports.vecAdjustTable = {
    n: { rowadj: -1, coladj: 0 },
    ne: { rowadj: -1, coladj: 1 },
    e: { rowadj: 0, coladj: 1 },
    se: { rowadj: 1, coladj: 1 },
    s: { rowadj: 1, coladj: 0 },
    sw: { rowadj: 1, coladj: -1 },
    w: { rowadj: 0, coladj: -1 },
    nw: { rowadj: -1, coladj: -1 },
};
function vecdata(vec, data) {
    return data[vec['row']][vec['col']];
}
exports.vecdata = vecdata;
function vecdataat(vec, data, dir) {
    let nvec = { row: vec['row'], col: vec['col'] };
    if (!vecmove(nvec, data, dir)) {
        return false;
    }
    return vecdata(nvec, data);
}
exports.vecdataat = vecdataat;
function vecdirs() {
    return Object.keys(exports.vecAdjustTable);
}
exports.vecdirs = vecdirs;
function vecinit(row, col) {
    return { row: row, col: col };
}
exports.vecinit = vecinit;
function vecp(vec) {
    return vec['row'] + "," + vec['col'];
}
exports.vecp = vecp;
function vecmove(vec, data, dir) {
    let nrow = vec['row'] + exports.vecAdjustTable[dir]['rowadj'];
    let ncol = vec['col'] + exports.vecAdjustTable[dir]['coladj'];
    if (nrow < 0 || nrow >= data.length || ncol < 0 || ncol >= data[0].length) {
        return false;
    }
    vec['row'] = nrow;
    vec['col'] = ncol;
    return true;
}
exports.vecmove = vecmove;
