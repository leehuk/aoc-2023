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
    let data = al.lines(filename).map(x => x.split(",")).flat().map(x => x.split("-").map(y => Number(y)));
    for (let row of data.values()) {
        for (let i = row[0]; i <= row[1]; i++) {
            let val = i.toString();
            if (val.length % 2 != 0) {
                continue;
            }
            if (val.slice(0, val.length / 2) == val.slice(val.length / 2)) {
                result += i;
            }
        }
    }
    al.finish(filename, result, check);
}
function handleTwo(filename, check) {
    let result = 0;
    let data = al.lines(filename).map(x => x.split(",")).flat().map(x => x.split("-").map(y => Number(y)));
    for (let row of data.values()) {
        for (let i = row[0]; i <= row[1]; i++) {
            let val = i.toString();
            for (let j = 2; j <= val.length; j++) {
                if (val.length % j != 0) {
                    continue;
                }
                let step = val.length / j;
                let cmp = val.slice(0, step);
                let match = true;
                for (let k = step; k < val.length; k += step) {
                    if (val.slice(k, k + step) != cmp) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    result += i;
                    break;
                }
            }
        }
    }
    al.finish(filename, result, check);
}
handleOne('sample-1.txt', 1227775554);
handleOne('data-1.txt', 53420042388);
handleTwo('sample-1.txt', 4174379265);
handleTwo('data-1.txt', 69553832684);
