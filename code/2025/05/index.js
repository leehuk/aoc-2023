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
function parse(data) {
    return data.map(line => {
        let res = line.match(/^([0-9]+)-([0-9]+)/);
        return res ? [Number(res[1]), Number(res[2])] : Number(line);
    });
}
function handleOne(filename, check) {
    let result = 0;
    let data = parse(al.lines(filename).filter(line => line !== ""));
    let ranges = data.filter(x => Array.isArray(x));
    let values = data.filter(x => !Array.isArray(x));
    OUTER: for (const value of values) {
        for (const range of ranges) {
            if (value >= range[0] && value <= range[1]) {
                result++;
                continue OUTER;
            }
        }
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).filter(x => x.includes("-")).map(x => x.split("-").map(x => Number(x)));
    // need multiple passes to fully extend, as we may push the start range over something
    // we've already skipped.  Track the length of array for that
    for (let length = 0; length != data.length;) {
        length = data.length;
        for (let range of data) {
            for (let [i, cmprange] of data.entries()) {
                if (range == cmprange) {
                    continue;
                }
                // starts or ends within this range
                if ((cmprange[0] >= range[0] && cmprange[0] <= range[1]) || (cmprange[1] >= range[0] && cmprange[1] <= range[1])) {
                    range[0] = Math.min(range[0], cmprange[0]);
                    range[1] = Math.max(range[1], cmprange[1]);
                    data.splice(i, 1);
                }
            }
        }
    }
    for (let range of data) {
        result += (range[1] - range[0]) + 1;
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 3);
handleOne('data-1.txt', 617);
handleTwo('sample-1.txt', 14);
handleTwo('data-1.txt', 338258295736104);
