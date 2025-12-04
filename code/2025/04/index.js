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
    let data = al.lines(filename).map(x => x.split(""));
    let grid = new al.CoordGrid(data);
    for (let pos of grid.findval("@")) {
        if (grid.neighs(pos, al.coordVec8Arr).filter(x => x.data == "@").length < 4) {
            result++;
        }
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(""));
    let grid = new al.CoordGrid(data);
    let updated = true;
    while (updated) {
        updated = false;
        for (let pos of grid.findval("@")) {
            if (grid.neighs(pos, al.coordVec8Arr).filter(x => x.data == "@").length < 4) {
                pos.data = ".";
                result++;
                updated = true;
            }
        }
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 13);
handleOne('data-1.txt', 1489);
handleTwo('sample-1.txt', 43);
handleTwo('data-1.txt', 8890);
