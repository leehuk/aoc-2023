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
;
function handleOne(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => {
        let res = x.match(/([0-9]+): (.*)/);
        return {
            target: parseInt(res[1]),
            parts: res[2].split(" ").map(x => parseInt(x)),
        };
    });
    for (let row of data.values()) {
        let first = row.parts.shift();
        let checks = [first];
        while (row.parts.length >= 1) {
            let val = row.parts.shift();
            checks = checks.map(x => [x + val, x * val]).flat().filter((val) => val > 0 && val <= row.target);
        }
        if (checks.includes(row.target)) {
            result += row.target;
        }
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => {
        let res = x.match(/([0-9]+): (.*)/);
        return {
            target: parseInt(res[1]),
            parts: res[2].split(" ").map(x => parseInt(x)),
        };
    });
    for (let row of data.values()) {
        let first = row.parts.shift();
        let checks = [first];
        while (row.parts.length >= 1) {
            let val = row.parts.shift();
            checks = checks.map(x => [x + val, x * val, Number(x.toString() + val.toString())]).flat().filter((val) => val > 0 && val <= row.target);
        }
        if (checks.includes(row.target)) {
            result += row.target;
        }
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 3749);
handleOne('data-1.txt', 4555081946288);
handleTwo('sample-1.txt', 11387);
handleTwo('data-1.txt', 227921760109726);
