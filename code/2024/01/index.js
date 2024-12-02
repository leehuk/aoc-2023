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
    let data = al.lines(filename).map(x => x.replace(/\s+/, " ")).map(x => x.split(" "));
    let left = data.map(x => parseInt(x[0])).toSorted();
    let right = data.map(x => parseInt(x[1])).toSorted();
    for (const [i, _] of left.entries()) {
        result += Math.abs(left[i] - right[i]);
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.replace(/\s+/, " ")).map(x => x.split(" "));
    let right = data.map(x => parseInt(x[1])).toSorted();
    for (const [_, val] of data.map(x => parseInt(x[0])).entries()) {
        result += (val * right.filter(x => x == val).length);
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 11);
handleOne('data-1.txt', 2166959);
handleTwo('sample-1.txt', 31);
handleTwo('data-1.txt', 0);
