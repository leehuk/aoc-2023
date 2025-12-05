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
function determinant(a, b, c, d) {
    return (a * d) - (b * c);
}
function cramer(data, adj = 0) {
    let res = { x: 0, y: 0 };
    if (adj > 0) {
        data[4] += adj;
        data[5] += adj;
    }
    let det = determinant(data[0], data[2], data[1], data[3]);
    if (det != 0) {
        let detx = determinant(data[4], data[2], data[5], data[3]) / det;
        let dety = determinant(data[0], data[4], data[1], data[5]) / det;
        if (Number.isInteger(detx) && Number.isInteger(dety)) {
            res.x = detx;
            res.y = dety;
        }
    }
    return res;
}
function handleOne(filename, check) {
    let result = 0;
    let data = al.lines(filename).reduce((acc, cur) => acc + (cur == "" ? "\n" : " ") + cur, "").split("\n");
    let res = [0, 0];
    data.forEach(line => {
        let match = line.match(/Button A: X\+([0-9]+), Y\+([0-9]+) Button B: X\+([0-9]+), Y\+([0-9]+) Prize: X=([0-9]+), Y=([0-9]+)/);
        if (!match) {
            console.log("ERROR: Regexp Failure");
            return;
        }
        let det = cramer(match.slice(1, 7).map(x => Number(x)));
        res[0] += det.x;
        res[1] += det.y;
    });
    result = (res[0] * 3) + res[1];
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).reduce((acc, cur) => acc + (cur == "" ? "\n" : " ") + cur, "").split("\n");
    let res = [0, 0];
    data.forEach(line => {
        let match = line.match(/Button A: X\+([0-9]+), Y\+([0-9]+) Button B: X\+([0-9]+), Y\+([0-9]+) Prize: X=([0-9]+), Y=([0-9]+)/);
        if (!match) {
            console.log("ERROR: Regexp Failure");
            return;
        }
        let det = cramer(match.slice(1, 7).map(x => Number(x)), 10000000000000);
        res[0] += det.x;
        res[1] += det.y;
    });
    result = (res[0] * 3) + res[1];
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 480);
handleOne('data-1.txt', 38839);
handleTwo('sample-1.txt', 0);
handleTwo('data-1.txt', 0);
