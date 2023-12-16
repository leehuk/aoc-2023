"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillarrayarr = exports.fillarray = void 0;
function fillarray(rows, cols) {
    return Array(rows).fill(undefined).map(r => Array(cols).fill(undefined).map(c => undefined));
}
exports.fillarray = fillarray;
function fillarrayarr(rows, cols) {
    return Array(rows).fill(undefined).map(r => Array(cols).fill(undefined).map(c => []));
}
exports.fillarrayarr = fillarrayarr;
