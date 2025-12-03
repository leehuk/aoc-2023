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
function maxpos(values) {
    let max = Math.max(...values);
    return { max: max, pos: values.indexOf(max) };
}
function handleOne(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split("").map(x => Number(x)));
    for (let row of data.values()) {
        let m1 = -1;
        let m2 = -1;
        for (let i = 0; i < row.length; i++) {
            if (row[i] > m1 && i < row.length - 1) {
                m1 = row[i];
                m2 = -1;
            }
            else if (row[i] > m2) {
                m2 = row[i];
            }
        }
        result += (m1 * 10) + m2;
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split("").map(x => Number(x)));
    for (let row of data.values()) {
        let len = 12;
        // sliding window length
        let wlen = row.length - len + 1;
        let maxv = "";
        let pos = 0;
        while (maxv.length < len) {
            let mp = maxpos(row.slice(pos, pos + wlen));
            maxv += mp.max.toString();
            pos += mp.pos + 1;
            wlen -= mp.pos;
            if (wlen == 1) {
                maxv += row.slice(pos).map(x => x.toString()).join("");
            }
        }
        result += Number(maxv);
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 357);
handleOne('data-1.txt', 17092);
handleTwo('sample-1.txt', 3121910778619);
handleTwo('data-1.txt', 170147128753455);
