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
function mgs(map, key, value) {
    let cur = map.get(key);
    if (cur === undefined) {
        map.set(key, value);
    }
    else {
        map.set(key, cur + value);
    }
}
function stoneShift(map) {
    let res = new Map;
    for (const [idx, count] of map.entries()) {
        if (idx === 0) {
            mgs(res, 1, count);
        }
        else {
            let sidx = idx.toString();
            if (sidx.length % 2 == 0) {
                mgs(res, Number(sidx.substring(0, sidx.length / 2)), count);
                mgs(res, Number(sidx.substring(sidx.length / 2)), count);
            }
            else {
                mgs(res, idx * 2024, count);
            }
        }
    }
    return res;
}
function handleOne(filename, check) {
    let result = 0;
    let data = new Map();
    al.lines(filename).map(x => x.split(" ")).flat().map(x => Number(x)).forEach(x => mgs(data, x, 1));
    for (let i = 0; i < 25; i++) {
        data = stoneShift(data);
    }
    for (const [_, count] of data.entries()) {
        result += count;
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = new Map();
    al.lines(filename).map(x => x.split(" ")).flat().map(x => Number(x)).forEach(x => mgs(data, x, 1));
    for (let i = 0; i < 75; i++) {
        data = stoneShift(data);
    }
    for (const [_, count] of data.entries()) {
        result += count;
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 55312);
handleOne('data-1.txt', 202019);
//handleTwo('sample-1.txt', 0);
handleTwo('data-1.txt', 239321955280205);
