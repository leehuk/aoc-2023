"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vecmove = exports.veclocate = exports.vecp = exports.vecinit = exports.vecdirs = exports.vecdataat = exports.vecdata = exports.degrotate = void 0;
;
;
;
const vecAdjustTable = {
    n: { row: -1, col: 0 },
    ne: { row: -1, col: 1 },
    e: { row: 0, col: 1 },
    se: { row: 1, col: 1 },
    s: { row: 1, col: 0 },
    sw: { row: 1, col: -1 },
    w: { row: 0, col: -1 },
    nw: { row: -1, col: -1 },
};
const vecDegreeTable = {
    n: 0,
    ne: 45,
    e: 90,
    se: 135,
    s: 180,
    sw: 225,
    w: 270,
    nw: 315,
};
function degrotate(dir, rot) {
    let deg = vecDegreeTable[dir.dir] + rot;
    while (deg >= 360) {
        deg -= 360;
    }
    while (deg < 0) {
        deg += 360;
    }
    for (const [key, value] of Object.entries(vecDegreeTable)) {
        if (deg == value) {
            dir.dir = key;
            return true;
        }
    }
    return false;
}
exports.degrotate = degrotate;
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
    return Object.keys(vecAdjustTable);
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
function veclocate(data, matcher) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === matcher) {
                return { row: i, col: j };
            }
        }
    }
    return false;
}
exports.veclocate = veclocate;
function vecmove(vec, data, dir) {
    let nrow = vec['row'] + vecAdjustTable[dir]['row'];
    let ncol = vec['col'] + vecAdjustTable[dir]['col'];
    if (nrow < 0 || nrow >= data.length || ncol < 0 || ncol >= data[0].length) {
        return false;
    }
    vec['row'] = nrow;
    vec['col'] = ncol;
    return true;
}
exports.vecmove = vecmove;
