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
function isValid(val) {
    if (val[1] < val[0]) {
        val = val.reverse();
    }
    for (let idx = 0; idx < val.length - 1; idx++) {
        let diff = Math.abs(val[idx] - val[idx + 1]);
        if (diff < 1 || diff > 3 || val[idx + 1] <= val[idx]) {
            return false;
        }
    }
    return true;
}
function handleOne(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(" ").map(x => parseInt(x)));
    result = data.reduce((acc, val) => { return isValid(val) ? acc + 1 : acc; }, 0);
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(" ").map(x => parseInt(x)));
    outer: for (const [_, val] of data.entries()) {
        if (isValid(val) || isValid(val.slice(1)) || isValid(val.slice(0, -1))) {
            result++;
            continue outer;
        }
        for (let idx = 1; idx < val.length - 1; idx++) {
            if (isValid([...val.slice(0, idx), ...val.slice(idx + 1)])) {
                result++;
                continue outer;
            }
        }
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 2);
handleOne('data-1.txt', 591);
handleTwo('sample-1.txt', 4);
handleTwo('data-1.txt', 621);
