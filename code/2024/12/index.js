"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const al = __importStar(require("leeh-aoc-lib"));
function handleOne(filename, check) {
    let result = 0;
    let grid = new al.CoordGrid(al.lines(filename).map(x => x.split("")));
    grid.addEdges(al.coordVec4Arr, function (from, to) { return (from.data === to.data) ? true : false; });
    let seen = new Set;
    grid.coords.forEach(col => col.forEach(pos => {
        if (seen.has(pos)) {
            return;
        }
        let edges = 0;
        let region = grid.edgeFlood(pos, al.coordVec4Arr);
        for (const wkpos of region) {
            edges += 4 - grid.neighsWithEdge(wkpos, al.coordVec4Arr).length;
            seen.add(wkpos);
        }
        result += (edges * region.size);
    }));
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let grid = new al.CoordGrid(al.lines(filename).map(x => x.split("")));
    grid.addEdges(al.coordVec4Arr, function (from, to) { return (from.data === to.data) ? true : false; });
    let seen = new Set;
    grid.coords.forEach(col => col.forEach(pos => {
        if (seen.has(pos)) {
            return;
        }
        let corners = 0;
        let region = grid.edgeFlood(pos, al.coordVec4Arr);
        for (const wkpos of region) {
            let vec = grid.neighsVec8(wkpos);
            // outer corners
            corners += ((!region.has(vec.n) && !region.has(vec.e)) ? 1 : 0) +
                ((!region.has(vec.n) && !region.has(vec.w)) ? 1 : 0) +
                ((!region.has(vec.s) && !region.has(vec.e)) ? 1 : 0) +
                ((!region.has(vec.s) && !region.has(vec.w)) ? 1 : 0);
            // inner corners
            corners += ((region.has(vec.n) && region.has(vec.e) && !region.has(vec.ne)) ? 1 : 0) +
                ((region.has(vec.n) && region.has(vec.w) && !region.has(vec.nw)) ? 1 : 0) +
                ((region.has(vec.s) && region.has(vec.e) && !region.has(vec.se)) ? 1 : 0) +
                ((region.has(vec.s) && region.has(vec.w) && !region.has(vec.sw)) ? 1 : 0);
            seen.add(wkpos);
        }
        result += (corners * region.size);
    }));
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 140);
handleOne('sample-2.txt', 772);
handleOne('sample-3.txt', 1930);
handleOne('data-1.txt', 1431440);
handleTwo('sample-1.txt', 80);
handleTwo('data-1.txt', 869070);
