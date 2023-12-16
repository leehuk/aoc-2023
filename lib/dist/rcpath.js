"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rccoladj = exports.rcrowadj = exports.rcPath = void 0;
;
;
exports.rcPath = {
    north: { rowadj: -1, coladj: 0 },
    east: { rowadj: 0, coladj: 1 },
    south: { rowadj: 1, coladj: 0 },
    west: { rowadj: 0, coladj: -1 }
};
function rcrowadj(dir) {
    return exports.rcPath[dir]['rowadj'];
}
exports.rcrowadj = rcrowadj;
function rccoladj(dir) {
    return exports.rcPath[dir]['coladj'];
}
exports.rccoladj = rccoladj;
